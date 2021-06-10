import "jest-extended";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/helpers";
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
		  "address": "0xFE8D8D622E31B21EF3ED035633C2B40E8FD9BBCA",
		  "type": "bip44",
		}
	`);
	});

	it("should generate an output from a publicKey", async () => {
		const result = await subject.fromPublicKey(identity.publicKey);

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "address": "0xFE8D8D622E31B21EF3ED035633C2B40E8FD9BBCA",
		  "type": "bip44",
		}
	`);
	});

	it("should generate an output from a privateKey", async () => {
		const result = await subject.fromPrivateKey(identity.privateKey);

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "address": "0xFE8D8D622E31B21EF3ED035633C2B40E8FD9BBCA",
		  "type": "bip44",
		}
	`);
	});
});
