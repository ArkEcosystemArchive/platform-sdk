import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";
import { MessageService } from "./message";

let subject: MessageService;

beforeEach(async () => (subject = await MessageService.__construct(createConfig())));

describe("MessageService", () => {
	it("should sign and verify a message", async () => {
		const result = await subject.sign({
			message: "Hello World",
			mnemonic: identity.mnemonic,
		});

		await expect(subject.verify(result)).resolves.toBeTrue();
	});
});
