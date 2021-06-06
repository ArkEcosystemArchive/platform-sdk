import "jest-extended";

import { Signatories } from "@arkecosystem/platform-sdk";

import { identity } from "../../test/fixtures/identity";
import { createService } from "../../test/helpers";
import { MessageService } from "./message";

let subject: MessageService;

beforeEach(async () => {
	subject = createService(MessageService);
});

describe("MessageService", () => {
	it("should sign and verify a message", async () => {
		const result = await subject.sign({
			message: "This is an example of a signed message.",
			signatory: new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					signingKey: "5KYZdUEo39z3FPrtuX2QbbwGnNP5zTd7yyr2SC1j299sBCnWjss",
					address: identity.address,
					publicKey: identity.publicKey,
					privateKey: identity.privateKey,
				}),
			),
		});

		await expect(subject.verify(result)).resolves.toBeTrue();
	});
});
