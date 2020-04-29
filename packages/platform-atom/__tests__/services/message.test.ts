import "jest-extended";

import { MessageService } from "../../src/services/message";
import { identity } from "../__fixtures__/identity";

let subject: MessageService;

beforeEach(() => (subject = new MessageService()));

describe("MessageService", () => {
	it("should sign and verify a message", () => {
		const result: any = subject.sign({
			message: "Hello World",
			passphrase: identity.passphrase,
		});

		expect(subject.verify(result)).toBeTrue();
	});
});
