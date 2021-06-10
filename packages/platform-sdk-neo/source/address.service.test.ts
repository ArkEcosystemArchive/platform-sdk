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
		  "address": "APPJtAkysCKBssD5EJzEpakntNk81nR7X2",
		  "type": "bip44",
		}
	`);
	});

	it("should generate an output from a publicKey", async () => {
		const result = await subject.fromPublicKey(identity.publicKey);

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "address": "APPJtAkysCKBssD5EJzEpakntNk81nR7X2",
		  "type": "bip44",
		}
	`);
	});

	it("should generate an output from a privateKey", async () => {
		const result = await subject.fromPrivateKey(identity.privateKey);

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "address": "APPJtAkysCKBssD5EJzEpakntNk81nR7X2",
		  "type": "bip44",
		}
	`);
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.fromWIF(identity.wif);

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "address": "APPJtAkysCKBssD5EJzEpakntNk81nR7X2",
		  "type": "bip44",
		}
	`);
	});

	it("should validate an address", async () => {
		await expect(subject.validate("AdVSe37niA3uFUPgCgMUH2tMsHF4LpLoiX")).resolves.toBeTrue();
		await expect(subject.validate("ABC")).resolves.toBeFalse();
	});
});
