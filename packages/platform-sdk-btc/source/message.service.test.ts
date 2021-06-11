import "jest-extended";

import { IoC, Signatories } from "@arkecosystem/platform-sdk";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { BindingType } from "./constants";
import { AddressService } from "./address.service";
import { AddressFactory } from "./address.factory";
import { MessageService } from "./message.service";

let subject: MessageService;

beforeEach(async () => {
	subject = createService(MessageService, undefined, (container) => {
		container.singleton(IoC.BindingType.AddressService, AddressService);
		container.singleton(BindingType.AddressFactory, AddressFactory);
	});
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
