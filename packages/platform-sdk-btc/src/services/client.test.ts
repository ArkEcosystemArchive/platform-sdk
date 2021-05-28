import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";

import { createConfig } from "../../test/helpers";
import { SignedTransactionData, TransactionData, WalletData } from "../dto";
import { ClientService } from "./client";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.__construct(createConfig())));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("ClientService", () => {
	describe("#transaction", () => {
		it("should succeed", async () => {
			nock("https://coins.com")
				.get("/api/btc/transactions/68ad0264053ab94fa7749e78d2f728911d166ca9af8dbb68e6ee264958ca7f32")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/transaction.json`));

			const result = await subject.transaction(
				"68ad0264053ab94fa7749e78d2f728911d166ca9af8dbb68e6ee264958ca7f32",
			);

			expect(result).toBeInstanceOf(TransactionData);
			expect(result.id()).toBe("68ad0264053ab94fa7749e78d2f728911d166ca9af8dbb68e6ee264958ca7f32");
			expect(result.type()).toBe("transfer");
			expect(result.timestamp()).toBeInstanceOf(DateTime);
			expect(result.confirmations()).toEqual(BigNumber.make(159414));
			// expect(result.sender()).toBe("...");
			// expect(result.recipient()).toBe("...");
			expect(result.amount()).toEqual(BigNumber.make(3050000));
			expect(result.fee()).toEqual(BigNumber.make(10000));
			// @ts-ignore - Better types so that memo gets detected on TransactionDataType
			expect(result.memo()).toBeUndefined();
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			nock("https://coins.com")
				.get("/api/btc/wallets/my48EN4kDnGEpRZMBfiDS65wdfwfgCGZRz")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/wallet.json`));

			const result = await subject.wallet("my48EN4kDnGEpRZMBfiDS65wdfwfgCGZRz");

			expect(result).toBeInstanceOf(WalletData);
			expect(result.address()).toBe("my48EN4kDnGEpRZMBfiDS65wdfwfgCGZRz");
			expect(result.publicKey()).toBe("76a914c05f53de525d80151e209a729cf1c7909c88f88e88ac");
			expect(result.balance().available).toEqual(BigNumber.make(3050000));
		});
	});

	describe("#broadcast", () => {
		it("should pass", async () => {
			nock("https://coins.com")
				.post("/api/btc/transactions")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/broadcast.json`));

			const result = await subject.broadcast([new SignedTransactionData("id", "transactionPayload", "")]);

			expect(result).toEqual({
				accepted: ["id"],
				rejected: [],
				errors: {},
			});
		});

		it("should fail", async () => {
			nock("https://coins.com")
				.post("/api/btc/transactions")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/broadcast-failure.json`));

			const result = await subject.broadcast([new SignedTransactionData("id", "transactionPayload", "")]);

			expect(result).toEqual({
				accepted: [],
				rejected: ["id"],
				errors: {
					id: ["ERR_IN_BELOWOUT"],
				},
			});
		});
	});
});
