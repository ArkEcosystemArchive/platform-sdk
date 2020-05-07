import "jest-extended";
import { BigNumber } from "@arkecosystem/utils";
import nock from "nock";

import { ClientService } from "../../src/services/client";
import { TransactionData, WalletData } from "../../src/dto";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.construct({ peer: "http://coins.com/api/eth" })));

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
			expect(result.type()).toBeUndefined();
			expect(result.typeGroup()).toBeUndefined();
			expect(result.timestamp()).toBeUndefined();
			expect(result.confirmations()).toEqual(BigNumber.ZERO);
			expect(result.nonce()).toBe(0);
			expect(result.sender()).toBe("0x4581A610f96878266008993475F1476cA9997081");
			expect(result.recipient()).toBe("0x230b2A8C0CcE28fd6eFF491c47aeBa244b10A12c");
			expect(result.amount()).toEqual(BigNumber.make("79000000000000"));
			expect(result.fee()).toEqual(BigNumber.make(21000));
			expect(result.memo()).toBeUndefined();
			expect(result.blockId()).toBe(7623266);
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
				count: 1,
			});

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(TransactionData);
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
});
