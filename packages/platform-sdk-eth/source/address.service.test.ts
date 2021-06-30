import "jest-extended";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { AddressService } from "./address.service";

let subject: AddressService;

beforeEach(async () => {
	subject = createService(AddressService);
});

describe("Address", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "address": "0x986A007A43D65FF18D040ACDAD844CFE7C349135",
		  "type": "bip44",
		}
	`);
	});

	it("should generate an output from a publicKey", async () => {
		const result = await subject.fromPublicKey(identity.publicKey);

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "address": "0x986A007A43D65FF18D040ACDAD844CFE7C349135",
		  "type": "bip44",
		}
	`);
	});

	it("should generate an output from a privateKey", async () => {
		const result = await subject.fromPrivateKey(identity.privateKey);

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "address": "0x986A007A43D65FF18D040ACDAD844CFE7C349135",
		  "type": "bip44",
		}
	`);
	});
});
