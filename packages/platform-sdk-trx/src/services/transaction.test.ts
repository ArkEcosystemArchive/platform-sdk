import "jest-extended";

import { Signatories } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { createConfig } from "../../test/helpers";
import { identity } from "../../test/fixtures/identity";
import { TransactionService } from "./transaction";

let subject: TransactionService;

beforeEach(async () => (subject = await TransactionService.__construct(createConfig())));

beforeAll(() => nock.disableNetConnect());

describe("TransactionService", function () {
	test("#transfer", async () => {
		nock("https://api.shasta.trongrid.io")
			.post("/wallet/createtransaction")
			.reply(200, require(`${__dirname}/../../test/fixtures/crypto/transfer.json`))
			.post("/wallet/broadcasttransaction")
			.reply(200, { result: true, txid: "920048e37005eb84299fe99ae666dcfe220a5befa587eec9c36c9e75dc37f821" });

		const result = await subject.transfer({
			signatory: new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					signingKey: identity.mnemonic,
					address: identity.address,
					publicKey: identity.publicKey,
					privateKey: identity.privateKey,
				}),
			),
			data: {
				to: "TEre3kN6JdPzqCNpiZT8JWM4kt8iGrg1Rm",
				amount: `${1e8}`,
			},
		});

		expect(result).toBeObject();
		expect(result.amount().divide(1e6).toString()).toBe(`${1e8}`);
	});
});
