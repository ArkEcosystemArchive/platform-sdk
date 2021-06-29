import "jest-extended";

import { IoC, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";

import { createService } from "../test/mocking";
import { SignedTransactionData } from "./signed-transaction.dto";
import { WalletData } from "./wallet.dto";
import { DataTransferObjects } from "./coin.dtos";
import { ClientService } from "./client.service";
import { ConfirmedTransactionData } from "./transaction.dto";

let subject: ClientService;

beforeAll(() => {
	nock.disableNetConnect();

	subject = createService(ClientService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
		container.constant(IoC.BindingType.DataTransferObjects, DataTransferObjects);
		container.singleton(IoC.BindingType.DataTransferObjectService, Services.AbstractDataTransferObjectService);
	});
});

afterEach(() => nock.cleanAll());

beforeAll(() => {
	nock.disableNetConnect();
});

describe("ClientService", () => {
	describe("#transaction", () => {
		it("should succeed", async () => {
			nock("https://coins.com")
				.get("/api/btc/transactions/68ad0264053ab94fa7749e78d2f728911d166ca9af8dbb68e6ee264958ca7f32")
				.reply(200, require(`${__dirname}/../test/fixtures/client/transaction.json`));

			const result = await subject.transaction(
				"68ad0264053ab94fa7749e78d2f728911d166ca9af8dbb68e6ee264958ca7f32",
			);

			expect(result).toBeInstanceOf(ConfirmedTransactionData);
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
				.reply(200, require(`${__dirname}/../test/fixtures/client/wallet.json`));

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
				.reply(200, require(`${__dirname}/../test/fixtures/client/broadcast.json`));

			const result = await subject.broadcast([
				createService(SignedTransactionData).configure("id", "transactionPayload", ""),
			]);

			expect(result).toEqual({
				accepted: ["id"],
				rejected: [],
				errors: {},
			});
		});

		it("should fail", async () => {
			nock("https://coins.com")
				.post("/api/btc/transactions")
				.reply(200, require(`${__dirname}/../test/fixtures/client/broadcast-failure.json`));

			const result = await subject.broadcast([
				createService(SignedTransactionData).configure("id", "transactionPayload", ""),
			]);

			expect(result).toEqual({
				accepted: [],
				rejected: ["id"],
				errors: {
					id: "bad-txns-in-belowout, value in (0.00041265) < value out (1.00) (code 16)",
				},
			});
		});
	});
});
