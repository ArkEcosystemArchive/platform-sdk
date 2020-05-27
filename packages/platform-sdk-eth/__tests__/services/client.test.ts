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
			nock("https://coins.com/api/eth")
				.get("/transactions/0x35a28a5b1785d3729afc809851466fcc9971d09922196a1ca6d155756c222435")
				.reply(200, require(`${__dirname}/../__fixtures__/client/transaction.json`));

			const result = await subject.transaction(
				"0x35a28a5b1785d3729afc809851466fcc9971d09922196a1ca6d155756c222435",
			);

			expect(result).toBeInstanceOf(TransactionData);
			expect(result.id()).toBe("0x35a28a5b1785d3729afc809851466fcc9971d09922196a1ca6d155756c222435");
			expect(result.type()).toBe("transfer");
			expect(result.timestamp()).toBeUndefined();
			expect(result.confirmations()).toEqual(BigNumber.ZERO);
			expect(result.sender()).toBe("0x4581A610f96878266008993475F1476cA9997081");
			expect(result.recipient()).toBe("0x230b2A8C0CcE28fd6eFF491c47aeBa244b10A12c");
			expect(result.amount()).toEqual(BigNumber.make("79000000000000"));
			expect(result.fee()).toEqual(BigNumber.make(21000));
			expect(result.memo()).toBeUndefined();
		});
	});

	describe("#transactions", () => {
		it("should succeed", async () => {
			nock("https://coins.com/api/eth")
				.get("/status")
				.reply(200, require(`${__dirname}/../__fixtures__/client/blockNumber.json`))
				.get("/blocks/7858728")
				.reply(200, require(`${__dirname}/../__fixtures__/client/transactions.json`));

			const result = await subject.transactions({
				address: "0x8e5231be3b71afdd0c417164986573fecddbae59",
				limit: 1,
			});

			expect(result.data).toBeObject();
			expect(result.data.first()).toBeInstanceOf(TransactionData);
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			nock("https://coins.com/api/eth")
				.get("/wallets/0x4581a610f96878266008993475f1476ca9997081")
				.reply(200, require(`${__dirname}/../__fixtures__/client/wallet.json`));

			const result = await subject.wallet("0x4581a610f96878266008993475f1476ca9997081");

			expect(result).toBeInstanceOf(WalletData);
			expect(result.address()).toBe("0x33605918275099dfEF77A56e4e8C0103b881d584");
			expect(result.publicKey()).toBeUndefined();
			expect(result.balance()).toEqual(BigNumber.make("3998865647999999997"));
			expect(result.nonce()).toEqual(BigNumber.make(9));
		});
	});

	describe("#syncing", () => {
		it("should succeed", async () => {
			nock("https://coins.com/api/eth")
				.get("/status")
				.reply(200, require(`${__dirname}/../__fixtures__/client/syncing.json`));

			const result = await subject.syncing();

			expect(result).toBeBoolean();
		});
	});

	describe("#broadcast", () => {
		it("should pass", async () => {
			nock("https://coins.com/api/eth")
				.post("/transactions")
				.reply(200, require(`${__dirname}/../__fixtures__/client/broadcast.json`));

			const result = await subject.broadcast(["transactionPayload"]);

			expect(result).toEqual({
				accepted: ["0x227cff6fc8990fecd43cc9c7768f2c98cc5ee8e7c98c67c11161e008cce2b172"],
				rejected: [],
				errors: {},
			});
		});

		it("should fail", async () => {
			nock("https://coins.com/api/eth")
				.post("/transactions")
				.reply(200, require(`${__dirname}/../__fixtures__/client/broadcast-failure.json`));

			const result = await subject.broadcast(["transactionPayload"]);

			expect(result).toEqual({
				accepted: [],
				rejected: ["0x227cff6fc8990fecd43cc9c7768f2c98cc5ee8e7c98c67c11161e008cce2b172"],
				errors: {
					"0x227cff6fc8990fecd43cc9c7768f2c98cc5ee8e7c98c67c11161e008cce2b172": ["ERR_INSUFFICIENT_FUNDS"],
				},
			});
		});
	});
});
