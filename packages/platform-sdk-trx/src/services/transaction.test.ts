import "jest-extended";

// import nock from "nock";

import { identity } from "../../test/identity";
import { createConfig } from "../../test/helpers";
import { TransactionService } from "./transaction";

let subject: TransactionService;

beforeEach(async () => (subject = await TransactionService.__construct(createConfig())));

// beforeAll(() => nock.disableNetConnect());

describe("TransactionService", function () {
	test("#transfer", async () => {
		// nock("https://api.shasta.trongrid.io")
		// 	.post("/wallet/createtransaction")
		// 	.reply(200, require(`${__dirname}/../../test/fixtures/crypto/transfer.json`));

		const result = await subject.transfer({
			from: identity.address,
			sign: {
				mnemonic: identity.mnemonic,
			},
			data: {
				to: "TY689z7Q2NpZYBxGfXbYR4PmS2WXyTNrir",
				amount: "1",
			},
		});

		expect(result).toBeObject();
	});
});
