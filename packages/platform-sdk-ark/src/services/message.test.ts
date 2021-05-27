import "jest-extended";

import { Signatories } from "@arkecosystem/platform-sdk";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";
import { MessageService } from "./message";

let subject: MessageService;

beforeEach(
	async () =>
		(subject = await MessageService.__construct(
			createConfig(undefined, {
				NETWORK_CONFIGURATION: {
					crypto: require(`${__dirname}/../../test/fixtures/client/cryptoConfiguration.json`).data,
					status: require(`${__dirname}/../../test/fixtures/client/syncing.json`).data,
				},
			}),
		)),
);

describe("MessageService", () => {
	it("should sign and verify a message", async () => {
		const result: any = await subject.sign({
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
