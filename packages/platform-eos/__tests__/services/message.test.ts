import "jest-extended";

import { MessageService } from "../../src/services/message";

let subject: Message;

beforeEach(() => (subject = new Message()));

describe("Message", () => {
	it("should sign and verify a message", () => {
		const result: any = subject.sign({
			message: "Hello World",
			passphrase: "5KTe9HSKoAF6CR2U5vy7fZYVTVg9C2YyRHtoa5hq9cUmRkCiZ18",
		});

		expect(subject.verify(result)).toBeTrue();
	});
});
