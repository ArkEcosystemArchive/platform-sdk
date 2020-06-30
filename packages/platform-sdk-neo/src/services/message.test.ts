import "jest-extended";

import { MessageService } from "./message";
import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";

let subject: MessageService;

beforeEach(async () => (subject = await MessageService.construct(createConfig())));

describe("MessageService", () => {
	it("should sign and verify a message", async () => {
		const result: any = await subject.sign({
			message: "Hello World",
			mnemonic: identity.privateKey,
		});

		await expect(subject.verify(result)).resolves.toBeTrue();
	});
});
