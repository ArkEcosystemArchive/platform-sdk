import "jest-extended";

import { TransactionService } from "../../src/services/transaction";

let subject: TransactionService;

beforeEach(async () => (subject = await TransactionService.construct({ network: "livenet" })));

describe("TransactionService", () => {
	describe("#transfer", () => {
		it("should verify", async () => {
			const result: any = await subject.transfer({
				nonce: 1,
				sign: {
					passphrase: "this is a top secret passphrase",
				},
				data: {
					amount: 1,
					to: "1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH",
				},
			});

			expect(result).toBeString();
		});
	});
});
