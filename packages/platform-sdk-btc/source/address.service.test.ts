import "jest-extended";

import { IoC } from "@arkecosystem/platform-sdk";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { BindingType } from "./constants";
import { AddressService } from "./address.service";
import { AddressFactory } from "./address.factory";

let subject: AddressService;

beforeEach(async () => {
	subject = createService(AddressService, undefined, async (container: IoC.Container) => {
		container.singleton(BindingType.AddressFactory, AddressFactory);
	});
});

describe("Address", () => {
	it("should generate an output from a mnemonic (BIP44)", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic, { bip44: { account: 0 } });

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "address": "1PLDRLacEkAaaiWnfojVDb5hWpwXvKJrRa",
		  "path": "m/44'/0'/0'/0/0",
		  "type": "bip44",
		}
	`);
	});

	it("should generate an output from a mnemonic (BIP49)", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic, { bip49: { account: 0 } });

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "address": "3GU5e9mPrLgPemhawVHHrDt6bjZZ6M9CPc",
		  "path": "m/49'/0'/0'/0/0",
		  "type": "bip49",
		}
	`);
	});

	it("should generate an output from a mnemonic (BIP84)", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic, { bip84: { account: 0 } });

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "address": "bc1qpeeu3vjrm9dn2y42sl926374y5cvdhfn5k7kxm",
		  "path": "m/84'/0'/0'/0/0",
		  "type": "bip84",
		}
	`);
	});

	it("should generate an output from a multiSignature", async () => {
		const result = await subject.fromMultiSignature(
			identity.multiSignature.min,
			identity.multiSignature.publicKeys,
		);

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "address": "36NUkt6FWUi3LAWBqWRdDmdTWbt91Yvfu7",
		  "type": "bip39",
		}
	`);
	});

	it("should generate an output from a publicKey", async () => {
		const result = await subject.fromPublicKey(identity.publicKey);

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "address": "12eUJoaWBENQ3tNZE52ZQaHqr3v4tTX4os",
		  "type": "bip39",
		}
	`);
	});

	it("should generate an output from a privateKey", async () => {
		const result = await subject.fromPrivateKey(identity.privateKey);

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "address": "12eUJoaWBENQ3tNZE52ZQaHqr3v4tTX4os",
		  "type": "bip39",
		}
	`);
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.fromWIF(identity.wif);

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "address": "12eUJoaWBENQ3tNZE52ZQaHqr3v4tTX4os",
		  "type": "bip39",
		}
	`);
	});
});
