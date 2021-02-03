import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";
import { SignedTransactionData } from "../dto/signed-transaction";
import { TransactionService } from "./transaction";

let subject: TransactionService;

beforeEach(async () => {
	subject = await TransactionService.construct(createConfig());
});

jest.setTimeout(10000);

describe("Core", () => {
	describe("#transfer", () => {
		it("should verify", async () => {
			const result = await subject.transfer({
				from: identity.address,
				sign: {
					mnemonic: identity.mnemonic,
				},
				data: {
					amount: "12345",
					to: identity.address,
				},
			});

			expect(result).toBeInstanceOf(SignedTransactionData);
		});
	});
});
