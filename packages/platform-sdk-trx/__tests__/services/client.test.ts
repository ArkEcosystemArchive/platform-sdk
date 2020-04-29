import "jest-extended";
import nock from "nock";

import { ClientService } from "../../src/services/client";
import { TransactionData, WalletData } from "../../src/dto";

let subject: ClientService;

beforeEach(() => (subject = new ClientService("https://api.shasta.trongrid.io")));

beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	describe("#getTransaction", () => {
		it("should succeed", async () => {
			nock("https://api.shasta.trongrid.io")
				.post("/wallet/gettransactionbyid")
				.reply(200, require(`${__dirname}/../__fixtures__/client/getTransaction.json`));

			const result = await subject.getTransaction(
				"0daa9f2507c4e79e39391ea165bb76ed018c4cd69d7da129edf9e95f0dae99e2",
			);

			expect(result).toBeInstanceOf(TransactionData);
		});
	});

	describe("#getWallet", () => {
		it("should succeed", async () => {
			nock("https://api.shasta.trongrid.io")
				.post("/walletsolidity/getaccount")
				.reply(200, require(`${__dirname}/../__fixtures__/client/getWallet.json`));

			const result = await subject.getWallet("TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ");

			expect(result).toBeInstanceOf(WalletData);
		});
	});

	describe("#postTransactions", () => {
		it("should succeed", async () => {
			nock("https://api.shasta.trongrid.io")
				.post("/wallet/createtransaction")
				.reply(200, require(`${__dirname}/../__fixtures__/client/postTransactions.json`))
				.post("/wallet/broadcasttransaction")
				.reply(200);

			const result = await subject.postTransactions([
				require(`${__dirname}/../__fixtures__/crypto/createTransferSigned.json`),
			]);

			expect(result).toBeUndefined();
		});
	});
});
