import "jest-extended";
import nock from "nock";

import { TransactionService } from "../../src/services/transaction";
import { testWallet } from "../__fixtures__/wallet";
import { createConfig } from "../helpers";

let subject: TransactionService;

beforeEach(async () => (subject = await TransactionService.construct(createConfig())));

beforeAll(() => nock.disableNetConnect());

describe("TransactionService", function () {
	describe("#transfer", () => {
		it("should succeed", async () => {
			nock("https://api.shasta.trongrid.io")
				.post("/wallet/createtransaction")
				.reply(200, require(`${__dirname}/../__fixtures__/crypto/transfer.json`));

			const result = await subject.transfer({
				sign: {
					passphrase: testWallet.privateKey,
				},
				data: {
					from: testWallet.address,
					to: "TY689z7Q2NpZYBxGfXbYR4PmS2WXyTNrir",
					amount: "1",
				},
			});

			expect(result).toBeObject();
		});
	});
});
