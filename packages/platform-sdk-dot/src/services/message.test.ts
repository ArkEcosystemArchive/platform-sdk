import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";
import { MessageService } from "./message";

let subject: MessageService;

beforeEach(async () => (subject = await MessageService.construct(createConfig())));

describe("MessageService", () => {
	it("should sign a message", async () => {
		const result: any = await subject.sign({
			message: "Hello World",
			mnemonic: identity.mnemonic,
		});

		expect(result.message).toBe("Hello World");
		expect(result.signatory).toBe("0xc0e7505bb4a5e539d7effbdb29347ad65075c4cdeb338486bfff9eabbcdb632d");
		expect(result.signature).toBeString();

		// await expect(subject.verify(result)).resolves.toBeTrue();
	});
});
