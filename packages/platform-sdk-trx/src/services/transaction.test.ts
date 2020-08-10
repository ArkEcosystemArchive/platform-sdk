import "jest-extended";

import nock from "nock";

import { testWallet } from "../../test/fixtures/wallet";
import { createConfig } from "../../test/helpers";
import { TransactionService } from "./transaction";

let subject: TransactionService;

beforeEach(async () => (subject = await TransactionService.construct(createConfig())));

beforeAll(() => nock.disableNetConnect());

describe("TransactionService", function () {
	describe("#transfer", () => {
		it("should succeed", async () => {
			nock("https://api.shasta.trongrid.io")
				.post("/wallet/createtransaction")
				.reply(200, require(`${__dirname}/../../test/fixtures/crypto/transfer.json`));

			const result = await subject.transfer({
				from: "TEre3kN6JdPzqCNpiZT8JWM4kt8iGrg1Rm",
				sign: {
					mnemonic: testWallet.privateKey,
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
