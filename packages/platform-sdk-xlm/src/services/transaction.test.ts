import "jest-extended";

import { Signatories, Test } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";
import { container } from "../container";
import { TransactionService } from "./transaction";

let subject: TransactionService;

beforeEach(async () => (subject = await TransactionService.__construct(createConfig())));

afterEach(() => nock.cleanAll());

beforeAll(() => {
	nock.disableNetConnect();

	Test.bindBigNumberService(container);
});

describe("TransactionService", () => {
	describe("#transfer", () => {
		it("should verify", async () => {
			nock("https://horizon-testnet.stellar.org")
				.get("/accounts/GCGYSPQBSQCJKNDXDISBSXAM3THK7MACUVZGEMXF6XRZCPGAWCUGXVNC")
				.query(true)
				.reply(200, require(`${__dirname}/../../test/fixtures/client/wallet.json`));

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
					amount: 1,
					to: identity.address,
				},
			});

			expect(result).toBeObject();
			expect(result.amount().toNumber()).toBe(10_000_000);
		});
	});
});
