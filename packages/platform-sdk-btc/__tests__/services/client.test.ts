import "jest-extended";

import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";

import { ClientService } from "../../src/services/client";
import { TransactionData, WalletData } from "../../src/dto";
import { createConfig } from "../helpers";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.construct(createConfig())));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	describe("#transaction", () => {
		it("should succeed", async () => {
			nock("https://coins.com")
				.get("/api/btc/transactions/68ad0264053ab94fa7749e78d2f728911d166ca9af8dbb68e6ee264958ca7f32")
				.reply(200, require(`${__dirname}/../__fixtures__/client/transaction.json`));

			const result = await subject.transaction(
				"68ad0264053ab94fa7749e78d2f728911d166ca9af8dbb68e6ee264958ca7f32",
			);

			expect(result).toBeInstanceOf(TransactionData);
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			nock("https://coins.com")
				.get("/api/btc/wallets/my48EN4kDnGEpRZMBfiDS65wdfwfgCGZRz")
				.reply(200, require(`${__dirname}/../__fixtures__/client/wallet.json`));

			const result = await subject.wallet("my48EN4kDnGEpRZMBfiDS65wdfwfgCGZRz");

			expect(result).toBeInstanceOf(WalletData);
			expect(result.address()).toBe("my48EN4kDnGEpRZMBfiDS65wdfwfgCGZRz");
			expect(result.publicKey()).toBe("76a914c05f53de525d80151e209a729cf1c7909c88f88e88ac");
			expect(result.balance()).toEqual(BigNumber.make(3050000));
		});
	});

	describe("#broadcast", () => {
		it("should pass", async () => {
			nock("https://coins.com")
				.post("/api/btc/transactions")
				.reply(200, require(`${__dirname}/../__fixtures__/client/broadcast.json`));

			const result = await subject.broadcast(["transactionPayload"]);

			expect(result).toEqual({
				accepted: ["transactionPayload"],
				rejected: [],
				errors: {},
			});
		});

		it("should fail", async () => {
			nock("https://coins.com")
				.post("/api/btc/transactions")
				.reply(200, require(`${__dirname}/../__fixtures__/client/broadcast-failure.json`));

			const result = await subject.broadcast(["transactionPayload"]);

			expect(result).toEqual({
				accepted: [],
				rejected: ["transactionPayload"],
				errors: {
					transactionPayload: ["ERR_IN_BELOWOUT"],
				},
			});
		});
	});
});
