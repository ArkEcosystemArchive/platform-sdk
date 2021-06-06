import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { KeyPairService } from "./key-pair";

let subject: KeyPairService;

beforeEach(async () => {
	subject = createService(KeyPairService);
});

describe("Keys", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "path": "m/44'/148'/0'",
		  "privateKey": "SCVPKP4VG6NDJHHGQ7OLDGWO6TZMZTUCKRMKUQ3KDGHCAJ7J5RG3L7WC",
		  "publicKey": "GCGYSPQBSQCJKNDXDISBSXAM3THK7MACUVZGEMXF6XRZCPGAWCUGXVNC",
		}
	`);
	});

	it("should generate an output from a private key", async () => {
		const result = await subject.fromPrivateKey(identity.privateKey);

		expect(result).toEqual({
			privateKey: identity.privateKey,
			publicKey: identity.publicKey,
		});
	});
});
