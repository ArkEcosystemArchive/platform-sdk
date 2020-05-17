import "jest-extended";

import { MessageService } from "../../src/services/message";
import { identity } from "../__fixtures__/identity";
import { createConfig } from "../helpers";

let subject: MessageService;

beforeEach(async () => (subject = await MessageService.construct(createConfig())));

describe("MessageService", () => {
	it("should sign and verify a message", async () => {
		const result: any = await subject.sign({
			message: "Hello World",
			passphrase: identity.passphrase,
		});

		await expect(subject.verify(result)).resolves.toBeTrue();
	});
});
