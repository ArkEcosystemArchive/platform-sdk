import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { PublicKeyService } from "./public-key";
import { createService } from "../../test/helpers";

let subject: PublicKeyService;

beforeEach(async () => {
	subject = createService(PublicKeyService);
});

describe("PublicKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "path": "m/44'/148'/0'",
		  "publicKey": "GCGYSPQBSQCJKNDXDISBSXAM3THK7MACUVZGEMXF6XRZCPGAWCUGXVNC",
		}
	`);
	});
});
