import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { AddressService } from "./address";

let subject: AddressService;

beforeEach(async () => (subject = new AddressService("livenet")));

describe("Address", () => {
	it("should generate an output from a mnemonic (BIP44)", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic, { bip44: { account: 0 } });

		expect(result).toEqual({ type: "bip44", address: identity.addressBIP44 });
	});

	it("should generate an output from a mnemonic (BIP49)", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic, { bip49: { account: 0 } });

		expect(result).toEqual({ type: "bip49", address: identity.addressBIP49 });
	});

	it("should generate an output from a mnemonic (BIP84)", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic, { bip84: { account: 0 } });

		expect(result).toEqual({ type: "bip84", address: identity.addressBIP84 });
	});

	it("should generate an output from a multiSignature", async () => {
		const result = await subject.fromMultiSignature(
			identity.multiSignature.min,
			identity.multiSignature.publicKeys,
		);

		expect(result).toEqual({ type: "bip39", address: "36NUkt6FWUi3LAWBqWRdDmdTWbt91Yvfu7" });
	});

	it("should generate an output from a publicKey", async () => {
		const result = await subject.fromPublicKey(identity.publicKey);

		expect(result).toEqual({ type: "bip39", address: identity.address });
	});

	it("should generate an output from a privateKey", async () => {
		const result = await subject.fromPrivateKey(identity.privateKey);

		expect(result).toEqual({ type: "bip39", address: identity.address });
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.fromWIF(identity.wif);

		expect(result).toEqual({ type: "bip39", address: identity.address });
	});
});
