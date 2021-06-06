import "jest-extended";

import { Signatories, Test } from "@arkecosystem/platform-sdk";

import { createConfig } from "../../test/config";
import { identity } from "../../test/fixtures/identity";
import { container } from "../container";
import { SignedTransactionData } from "../dto/signed-transaction";
import { TransactionService } from "./transaction";

let subject: TransactionService;

beforeEach(async () => (subject = await TransactionService.__construct(createConfig())));

describe("TransactionService", () => {
	describe("#transfer", () => {
		it("should sign transaction", async () => {
			const result = await subject.transfer({
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory({
						signingKey: identity.mnemonic,
						address: identity.bech32Address,
						publicKey: identity.publicKey,
						privateKey: identity.privateKey,
					}),
				),
				data: {
					amount: 100,
					to: identity.bech32Address,
				},
				fee: 2000,
				feeLimit: 50,
				nonce: "1",
			});

			expect(result).toBeInstanceOf(SignedTransactionData);
			expect(typeof result.toBroadcast()).toBe("string");
			expect(result.amount().toNumber()).toBe(100_000_000_000_000);
		});
	});
});
