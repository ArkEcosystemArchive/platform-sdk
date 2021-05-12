import "jest-extended";

import nock from "nock";

import { testWallet } from "../../test/fixtures/wallet";
import { createConfig } from "../../test/helpers";
import { TransactionService } from "./transaction";

let subject: TransactionService;

beforeEach(async () => (subject = await TransactionService.__construct(createConfig())));

beforeAll(() => nock.disableNetConnect());

describe("TransactionService", function () {
	describe("#transfer", () => {
		it("should succeed", async () => {
			nock("https://api.shasta.trongrid.io")
				.post('/wallet/createtransaction', {"to_address":"41f2a1a2377b09618bf68a5cc06651cc01ee829833","owner_address":"4139c3b797ef0f0ef03d7247342d2698d039549532","amount":1})
				.reply(200, require(`${__dirname}/../../test/fixtures/crypto/transfer.json`));
			// nock.recorder.rec();

			const result = await subject.transfer({
				from: testWallet.address,
				sign: {
					mnemonic: testWallet.mnemonic,
				},
				data: {
					to: "TY689z7Q2NpZYBxGfXbYR4PmS2WXyTNrir",
					amount: "1",
				},
			});

			// nock.restore();
			expect(result).toBeObject();
		});
	});
});
