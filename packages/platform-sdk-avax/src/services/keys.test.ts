import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createService } from "../../test/helpers";
import { KeyPairService } from "./key-pair";

let subject: KeyPairService;

beforeEach(async () => (subject = new KeyPairService(createConfig())));

describe("Keys", () => {
	it("should generate an output from a mnemonic", async () => {
		await expect(subject.fromMnemonic(identity.mnemonic)).resolves.toMatchInlineSnapshot(`
					Object {
					  "path": "m/44'/9000'/0'/0/0",
					  "privateKey": "rC7DsPL1zKuPnwnqHSnShdXxeMReKWLBJgKcuJ1ZLUCUrzRni",
					  "publicKey": "7qobgTQPiy3mH4tvjabDjapPVrh9Tnkb3tpn2yY37hsEyxaSjW",
					}
				`);
	});

	it("should generate an output from a privateKey", async () => {
		await expect(subject.fromPrivateKey(identity.privateKey)).resolves.toEqual({
			publicKey: identity.publicKey,
			privateKey: identity.privateKey,
		});
	});

	it("should generate an output from a wif", async () => {
		await expect(subject.fromWIF(identity.wif)).rejects.toThrow(/is not implemented/);
	});
});
