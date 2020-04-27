import "jest-extended";

import { Atom } from "../../../src/coins/atom/message";
import { identity } from "./__fixtures__/identity";

let subject: Atom;

beforeEach(() => (subject = new Atom()));

describe("Atom", () => {
	it("should sign and verify a message", () => {
		const result: any = subject.sign({
			message: "Hello World",
			passphrase: identity.passphrase,
		});

		expect(subject.verify(result)).toBeTrue();
	});
});
