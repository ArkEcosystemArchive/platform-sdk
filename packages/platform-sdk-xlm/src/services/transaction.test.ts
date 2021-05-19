import "jest-extended";

import { Signatories } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";
import { TransactionService } from "./transaction";

let subject: TransactionService;

beforeEach(async () => (subject = await TransactionService.__construct(createConfig())));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("TransactionService", () => {
	describe("#transfer", () => {
		it("should verify", async () => {
			nock("https://horizon-testnet.stellar.org")
				.get("/accounts/GCGYSPQBSQCJKNDXDISBSXAM3THK7MACUVZGEMXF6XRZCPGAWCUGXVNC")
				.query(true)
				.reply(200, require(`${__dirname}/../../test/fixtures/client/wallet.json`));

			const result: any = await subject.transfer({
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory(identity.mnemonic, identity.address),
				),
				data: {
					amount: "10000000",
					to: identity.address,
				},
			});

			expect(result).toBeObject();
		});
	});
});
