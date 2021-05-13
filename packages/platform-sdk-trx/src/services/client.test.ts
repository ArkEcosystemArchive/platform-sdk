import "jest-extended";

import { TransactionDataCollection } from "@arkecosystem/platform-sdk/dist/coins";
import nock from "nock";

import { createConfig } from "../../test/helpers";
import { SignedTransactionData, TransactionData, WalletData } from "../dto";
import { ClientService } from "./client";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.__construct(createConfig())));

beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	describe("#transaction", () => {
		it("should succeed", async () => {
			nock("https://api.shasta.trongrid.io")
				.post("/wallet/gettransactionbyid")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/transaction.json`));

			const result = await subject.transaction(
				"0daa9f2507c4e79e39391ea165bb76ed018c4cd69d7da129edf9e95f0dae99e2",
			);

			expect(result).toBeInstanceOf(TransactionData);
		});
	});

	describe("#transactions", () => {
		it("should succeed", async () => {
			nock("https://api.shasta.trongrid.io")
				.get("/v1/accounts/TUrM3F7b7WVZSZVjgrqsVBYXQL3GVgAqXq/transactions")
				.query(true)
				.reply(200, require(`${__dirname}/../../test/fixtures/client/transactions.json`));

			const result = await subject.transactions({ address: "TUrM3F7b7WVZSZVjgrqsVBYXQL3GVgAqXq" });

			expect(result).toBeInstanceOf(TransactionDataCollection);
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			nock("https://api.shasta.trongrid.io")
				.get("/v1/accounts/TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/wallet.json`));

			const result = await subject.wallet("TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ");

			expect(result).toBeInstanceOf(WalletData);
			expect(result.balance()).toMatchInlineSnapshot(`
			Object {
			  "available": BigNumber {},
			  "fees": BigNumber {},
			  "locked": BigNumber {},
			  "tokens": Object {
			    "TLa2f6VPqDgRE67v1736s7bJ8Ray5wYjU7": BigNumber {},
			  },
			  "total": BigNumber {},
			}
		`);
		});
	});

	describe("#broadcast", () => {
		it("should pass", async () => {
			nock("https://api.shasta.trongrid.io")
				.post("/wallet/broadcasttransaction")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/broadcast.json`));

			const result = await subject.broadcast([
				new SignedTransactionData(
					require(`${__dirname}/../../test/fixtures/crypto/transferSigned.json`).txID,
					require(`${__dirname}/../../test/fixtures/crypto/transferSigned.json`),
					require(`${__dirname}/../../test/fixtures/crypto/transferSigned.json`),
				),
			]);

			expect(result).toEqual({
				accepted: ["8768a0f9849e2189fe323d4bb9d7485e7a045273096275f1bcb51b1433f73fc3"],
				rejected: [],
				errors: {},
			});
		});

		it("should fail", async () => {
			nock("https://api.shasta.trongrid.io")
				.post("/wallet/broadcasttransaction")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/broadcast-failure.json`));

			const result = await subject.broadcast([
				new SignedTransactionData(
					require(`${__dirname}/../../test/fixtures/crypto/transferSigned.json`).txID,
					require(`${__dirname}/../../test/fixtures/crypto/transferSigned.json`),
					require(`${__dirname}/../../test/fixtures/crypto/transferSigned.json`),
				),
			]);

			expect(result).toEqual({
				accepted: [],
				rejected: ["8768a0f9849e2189fe323d4bb9d7485e7a045273096275f1bcb51b1433f73fc3"],
				errors: {
					"8768a0f9849e2189fe323d4bb9d7485e7a045273096275f1bcb51b1433f73fc3": ["ERR_INVALID_SIGNATURE"],
				},
			});
		});
	});
});
