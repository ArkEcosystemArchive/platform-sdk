import "jest-extended";

import { Lisk } from "../../../src/coins/lsk/message";
import { identity } from "./__fixtures__/identity";

let subject: Lisk;

beforeEach(() => (subject = new Lisk()));

describe("Lisk", () => {
	it("should sign and verify a message", () => {
		const result: any = subject.sign({
			message: "Hello World",
			passphrase: identity.passphrase,
		});

		expect(subject.verify(result)).toBeTrue();
	});
});
