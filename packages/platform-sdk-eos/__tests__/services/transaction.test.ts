import "jest-extended";

import { TransactionService } from "../../src/services/transaction";

let subject: TransactionService;

beforeEach(async () => {
	subject = await TransactionService.construct({ peer: "https://testnet.wax.pink.gg/" });
});

describe("TransactionService", () => {
	describe("#transfer", () => {
		it("should verify", async () => {
			const result = await subject.transfer({
				sign: {
					passphrase: "...",
				},
				data: {
					amount: 1,
					to: "...",
				},
			});

			console.log(result)
		});
	});
});
