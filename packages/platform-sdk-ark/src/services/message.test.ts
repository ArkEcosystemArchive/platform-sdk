import "jest-extended";

import { Signatories } from "@arkecosystem/platform-sdk";

import { identity } from "../../test/fixtures/identity";
import { createConfigWithNetwork } from "../../test/helpers";
import { MessageService } from "./message";

let subject: MessageService;

beforeEach(async () => {
	subject = await MessageService.__construct(createConfigWithNetwork())
});

describe("MessageService", () => {
	it("should sign and verify a message", async () => {
		const result = await subject.sign({
			message: "Hello World",
			signatory: new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					signingKey: identity.mnemonic,
					address: identity.address,
					publicKey: identity.publicKey,
					privateKey: identity.privateKey,
				}),
			),
		});

		await expect(subject.verify(result)).resolves.toBeTrue();
	});
});
