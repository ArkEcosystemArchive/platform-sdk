import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createService } from "../../test/helpers";
import { KeyPairService } from "./key-pair";

let subject: KeyPairService;

beforeEach(async () => (subject = new KeyPairService(createConfig())));

describe("Keys", () => {
	describe("#fromMnemonic", () => {
		it("should generate an output from a mnemonic", async () => {
			await expect(subject.fromMnemonic(identity.mnemonic)).resolves.toMatchInlineSnapshot(`
						Object {
						  "path": "m/44'/195'/0'/0/0",
						  "privateKey": "990156e4859ff56f433306d71b858b222372dea7c6b7af64f487059bcc97e159",
						  "publicKey": "0277a3fb802f02a0fc916370c1fe14355db6cc91d6355ac600e2039a267a7e1b3c",
						}
					`);
		});
	});
});
