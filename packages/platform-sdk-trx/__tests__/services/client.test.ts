import "jest-extended";
import nock from "nock";

import { ClientService } from "../../src/services/client";
import { TransactionData, WalletData } from "../../src/dto";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.construct({ peer: "https://api.shasta.trongrid.io" })));

beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	describe("#transaction", () => {
		it("should succeed", async () => {
			nock("https://api.shasta.trongrid.io")
				.post("/wallet/gettransactionbyid")
				.reply(200, require(`${__dirname}/../__fixtures__/client/transaction.json`));

			const result = await subject.transaction(
				"0daa9f2507c4e79e39391ea165bb76ed018c4cd69d7da129edf9e95f0dae99e2",
			);

			expect(result).toBeInstanceOf(TransactionData);
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			nock("https://api.shasta.trongrid.io")
				.post("/walletsolidity/getaccount")
				.reply(200, require(`${__dirname}/../__fixtures__/client/wallet.json`));

			const result = await subject.wallet("TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ");

			expect(result).toBeInstanceOf(WalletData);
		});
	});

	describe("#broadcast", () => {
		it("should pass", async () => {
			nock("https://api.shasta.trongrid.io")
				.post("/wallet/broadcasttransaction")
				.reply(200, require(`${__dirname}/../__fixtures__/client/broadcast.json`));

			const result = await subject.broadcast([
				require(`${__dirname}/../__fixtures__/crypto/transferSigned.json`),
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
				.reply(200, require(`${__dirname}/../__fixtures__/client/broadcast-failure.json`));

			const result = await subject.broadcast([
				require(`${__dirname}/../__fixtures__/crypto/transferSigned.json`),
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
