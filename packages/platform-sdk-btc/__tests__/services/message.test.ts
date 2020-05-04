import "jest-extended";

import { MessageService } from "../../src/services/message";

let subject: MessageService;

beforeEach(async () => (subject = await MessageService.construct({})));

describe("MessageService", () => {
	it("should sign and verify a message", async () => {
		const result: any = await subject.sign({
			message: "This is an example of a signed message.",
			passphrase: "5KYZdUEo39z3FPrtuX2QbbwGnNP5zTd7yyr2SC1j299sBCnWjss",
		});

		await expect(subject.verify(result)).resolves.toBeTrue();
	});
});
