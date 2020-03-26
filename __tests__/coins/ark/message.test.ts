import "jest-extended";

import { Ark } from "../../../src/coins/ark/message";
import { identity } from "./__fixtures__/identity";

let subject: Ark;

beforeEach(() => (subject = new Ark()));

describe("Ark", () => {
	it("should sign and verify a message", () => {
		const result: any = subject.sign({
			message: "Hello World",
			passphrase: identity.passphrase,
		});

		expect(subject.verify(result)).toBeTrue();
	});
});
