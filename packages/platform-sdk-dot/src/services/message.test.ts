import "jest-extended";

import { Signatories } from "@arkecosystem/platform-sdk";
import { waitReady } from "@polkadot/wasm-crypto";

import { identity } from "../../test/fixtures/identity";
import { createService } from "../../test/helpers";
import { MessageService } from "./message";

let subject: MessageService;

beforeEach(async () => {
	await waitReady();

	subject = createService(MessageService);
});

describe("MessageService", () => {
	it("should sign a message", async () => {
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
