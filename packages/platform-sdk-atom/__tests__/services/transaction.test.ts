import "jest-extended";

import { TransactionService } from "../../src/services/transaction";

let subject: TransactionService;

beforeEach(async () => (subject = await TransactionService.construct("devnet")));

describe("TransactionService", () => {
	describe.skip("#createTransfer", () => {
		it("should verify", async () => {
			const result: any = await subject.createTransfer({
				sign: {
					passphrase: "this is a top secret passphrase",
				},
				data: {
					amount: 1,
					to: "cosmos1fvxjdyfdvat5g0ee7jmyemwl2n95ad7negf7ap",
				},
			});

			console.log(result);
		});
	});
});
