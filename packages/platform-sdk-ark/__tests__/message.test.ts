import "jest-extended";

import { Message } from "../src/message";
import { identity } from "./__fixtures__/identity";

let subject: Message;

beforeEach(() => (subject = new Message()));

describe("Message", () => {
	it("should sign and verify a message", () => {
		const result: any = subject.sign({
			message: "Hello World",
			passphrase: identity.passphrase,
		});

		expect(subject.verify(result)).toBeTrue();
	});
});
