import "jest-extended";

import { Atom } from "../../../src/coins/atom/crypto";

let subject: Atom;

beforeEach(() => (subject = new Atom("devnet")));

describe("Atom", () => {
	describe("#createTransfer", () => {
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
