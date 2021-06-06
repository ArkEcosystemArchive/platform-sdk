import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { PublicKeyService } from "./public-key";

let subject: PublicKeyService;

beforeEach(async () => (subject = new PublicKeyService(createConfig())));

describe("PublicKey", () => {
	it("should generate an output from a mnemonic", async () => {
		await expect(subject.fromMnemonic(identity.mnemonic)).resolves.toMatchInlineSnapshot(`
					Object {
					  "path": "m/44'/9000'/0'/0/0",
					  "publicKey": "7qobgTQPiy3mH4tvjabDjapPVrh9Tnkb3tpn2yY37hsEyxaSjW",
					}
				`);
	});

	it("should fail to generate an output from a multiSignature", async () => {
		await expect(subject.fromMultiSignature(0, [])).rejects.toThrow(/is not implemented/);
	});

	it("should fail to generate an output from a wif", async () => {
		await expect(subject.fromWIF(identity.wif)).rejects.toThrow(/is not implemented/);
	});
});
