import "jest-extended";

import { Signatories, Test } from "@arkecosystem/platform-sdk";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";
import { SignedTransactionData } from "../dto/signed-transaction";
import { TransactionService } from "./transaction";
import { container } from "../container";

let subject: TransactionService;

beforeAll(() => {
	Test.bindBigNumberService(container);
});

beforeEach(async () => (subject = await TransactionService.__construct(createConfig())));

jest.setTimeout(10000);

describe("TransactionService", () => {
	describe("#transfer", () => {
		it("should verify", async () => {
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
					amount: 12345,
					to: identity.address,
				},
			});

			expect(result).toBeInstanceOf(SignedTransactionData);
			expect(result.amount().toString()).toBe("123450000000000");
		});
	});
});
