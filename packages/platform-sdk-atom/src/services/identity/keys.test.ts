import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createService } from "../../test/helpers";
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
		  "path": "m/44'/118'/0'/0/0",
		  "privateKey": "ab0348360dd030e97849683564570fa34a74dbccfc96b12632003d07592e155e",
		  "publicKey": "0386b39760b417b960afbadb129bb14245938116770462bc7dac14c93840371cff",
		}
	`);
	});

	it("should generate an output from a wif", async () => {
		await expect(subject.fromWIF(identity.wif)).rejects.toThrow(/is not implemented/);
	});
});
