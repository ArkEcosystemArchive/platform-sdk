import "jest-extended";

import { IoC, Signatories } from "@arkecosystem/platform-sdk";
import { waitReady } from "@polkadot/wasm-crypto";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/helpers";
import { BindingType } from "./constants";
import { createKeyring } from "./helpers";
import { MessageService } from "./message.service";

let subject: MessageService;

beforeEach(async () => {
	await waitReady();

	subject = createService(MessageService, undefined, async (container: IoC.Container) => {
		container.constant(BindingType.Keyring, createKeyring(container.get(IoC.BindingType.ConfigRepository)));
	});
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
