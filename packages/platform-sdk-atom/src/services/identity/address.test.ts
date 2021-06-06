import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createService } from "../../test/helpers";
import { AddressService } from "./address";

let subject: AddressService;

beforeEach(async () => {
	subject = createService(AddressService);
});

describe("Address", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "address": "cosmos1fvxjdyfdvat5g0ee7jmyemwl2n95ad7negf7ap",
		  "path": "m/44'/118'/0'/0/0",
		  "type": "bip44",
		}
	`);
	});

	it("should generate an output from a multiSignature", async () => {
		await expect(
			subject.fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys),
		).rejects.toThrow(/is not implemented/);
	});

	it("should generate an output from a publicKey", async () => {
		await expect(subject.fromPublicKey(identity.publicKey)).rejects.toThrow(/is not implemented/);
	});

	it("should generate an output from a privateKey", async () => {
		await expect(subject.fromPrivateKey(identity.privateKey)).rejects.toThrow(/is not implemented/);
	});

	it("should generate an output from a wif", async () => {
		await expect(subject.fromWIF(identity.wif)).rejects.toThrow(/is not implemented/);
	});
});
