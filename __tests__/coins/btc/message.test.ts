import "jest-extended";

import { Bitcoin } from "../../../src/coins/btc/message";

let subject: Bitcoin;

beforeEach(() => (subject = new Bitcoin()));

describe("Bitcoin", () => {
	it("should sign and verify a message", () => {
		const result: any = subject.sign({
			message: "This is an example of a signed message.",
			wif: "5KYZdUEo39z3FPrtuX2QbbwGnNP5zTd7yyr2SC1j299sBCnWjss",
		});

		expect(
			subject.verify({
				message: result.message,
				address: "1HZwkjkeaoZfTSaJxDw6aKkxp45agDiEzN",
				signature: result.signature,
			}),
		).toBeTrue();
	});
});
