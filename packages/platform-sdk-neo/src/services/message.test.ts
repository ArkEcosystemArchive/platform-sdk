import "jest-extended";

import { Signatories } from "@arkecosystem/platform-sdk";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";
import { MessageService } from "./message";

let subject: MessageService;

beforeEach(async () => (subject = await MessageService.__construct(createConfig())));

describe("MessageService", () => {
	it("should sign and verify a message", async () => {
		const result: any = await subject.sign({
			message: "Hello World",
			signatory: new Signatories.Signatory(
				new Signatories.PrivateKeySignatory({
					signingKey: identity.privateKey,
					address: identity.address,
					privateKey: identity.privateKey,
				}),
			),
		});

		await expect(subject.verify(result)).resolves.toBeTrue();
	});
});
