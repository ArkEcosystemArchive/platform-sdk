import { Signatories } from "@arkecosystem/platform-sdk";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";
import { SignedTransactionData } from "../dto";
import { TransactionService } from "./transaction";

let subject: TransactionService;

beforeEach(async () => (subject = await TransactionService.__construct(createConfig())));

describe("TransactionService", () => {
	describe("#transfer", () => {
		it.skip("should verify", async () => {
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
					amount: "1",
					to: identity.address,
				},
			});

			expect(result).toBeInstanceOf(SignedTransactionData);
		});
	});
});
