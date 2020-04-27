import "jest-extended";

import { EOS } from "../../../src/coins/eos/message";

let subject: EOS;

beforeEach(() => (subject = new EOS()));

describe("EOS", () => {
	it("should sign and verify a message", () => {
		const result: any = subject.sign({
			message: "Hello World",
			passphrase: "5KTe9HSKoAF6CR2U5vy7fZYVTVg9C2YyRHtoa5hq9cUmRkCiZ18",
		});

		expect(subject.verify(result)).toBeTrue();
	});
});
