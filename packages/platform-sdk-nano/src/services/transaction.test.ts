import "jest-extended";

import nock from "nock";

import { Signatories } from "@arkecosystem/platform-sdk";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";
import { SignedTransactionData } from "../dto/signed-transaction";
import { TransactionService } from "./transaction";

let subject: TransactionService;

beforeEach(async () => (subject = await TransactionService.__construct(createConfig())));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("TransactionService", () => {
	describe("#transfer", () => {
		it("should sign transaction", async () => {
			nock("https://proxy.nanos.cc/")
				.post("/proxy/")
				.reply(200, require(`${__dirname}/../../test/fixtures/client/account-info.json`));

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
					amount: "420.69",
					to: identity.address,
				},
			});

			expect(result).toBeInstanceOf(SignedTransactionData);
		});
	});
});
