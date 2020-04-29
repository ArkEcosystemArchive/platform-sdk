import "jest-extended";
import nock from "nock";

import { TransactionService } from "../../src/services/transaction";
import { testWallet } from "../__fixtures__/wallet";

let subject: TransactionService;

beforeEach(() => (subject = new TransactionService("https://api.shasta.trongrid.io")));

beforeAll(() => nock.disableNetConnect());

describe("TransactionService", function () {
	describe("#createTransfer", () => {
		it("should succeed", async () => {
			nock("https://api.shasta.trongrid.io")
				.post("/wallet/createtransaction")
				.reply(200, require(`${__dirname}/../__fixtures__/crypto/createTransfer.json`));

			const result = await subject.createTransfer({
				from: testWallet.address,
				to: "TY689z7Q2NpZYBxGfXbYR4PmS2WXyTNrir",
				amount: 1,
				privateKey: testWallet.privateKey,
			});

			expect(result).toBeObject();
		});
	});
});
