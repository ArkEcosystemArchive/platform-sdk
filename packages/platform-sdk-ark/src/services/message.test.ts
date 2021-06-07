import "jest-extended";

import { Exceptions, Services, Signatories } from "@arkecosystem/platform-sdk";

import { identity } from "../../test/fixtures/identity";
import { createConfigWithNetwork } from "../../test/helpers";
import { MessageService } from "./message";

let subject: MessageService;

beforeEach(async () => subject = await MessageService.__construct(createConfigWithNetwork()));

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
		await expect(subject.verify({} as Services.SignedMessage)).rejects.toThrow(Exceptions.CryptoException);
	});

	it("shouldn't sign and verify a invalid message", async () => {
		await expect(subject.sign({} as Services.MessageInput)).rejects.toThrow(Exceptions.CryptoException);
	})
});
