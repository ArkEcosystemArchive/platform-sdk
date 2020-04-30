import "jest-extended";

import { MessageService } from "../../src/services/message";

let subject: MessageService;

beforeEach(async () => (subject = await MessageService.construct()));

describe("MessageService", () => {
	it("should sign and verify a message", async () => {
		const result: any = await subject.sign({
			message: "Hello World",
			passphrase: "5KTe9HSKoAF6CR2U5vy7fZYVTVg9C2YyRHtoa5hq9cUmRkCiZ18",
		});

		await expect(subject.verify(result)).resolves.toBeTrue();
	});
});
