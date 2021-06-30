import "jest-extended";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { KeyPairService } from "./key-pair.service";

let subject: KeyPairService;

beforeEach(async () => {
	subject = createService(KeyPairService);
});

describe("Keys", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "path": "m/44'/118'/0'/0/0",
		  "privateKey": "22c88ff4e97fb3831564b094129933cea8303c4b5ed8d9a872c34746e72db748",
		  "publicKey": "030231b08f7297f25ce80c593fec839d1fe30d1f340d12d8dcefdb2b17055bd998",
		}
	`);
	});
});
