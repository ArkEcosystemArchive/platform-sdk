import "jest-extended";

import { Crypto } from "../src/crypto";

let subject: Crypto;

beforeEach(() => (subject = new Crypto("devnet")));

describe("Crypto", () => {
	describe.skip("#createTransfer", () => {
		it("should verify", async () => {
			const result: any = await subject.createTransfer({
				amount: 1,
				recipientId: "cosmos1fvxjdyfdvat5g0ee7jmyemwl2n95ad7negf7ap",
				passphrase: "this is a top secret passphrase",
			});

			console.log(result);
		});
	});
});
