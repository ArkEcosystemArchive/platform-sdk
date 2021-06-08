import { Exceptions } from "@arkecosystem/platform-sdk";
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

		expect(result).toEqual({ type: "bip39", address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib" });
	});

	it("should generate an output from a multiSignature", async () => {
		const result = await subject.fromMultiSignature(
			identity.multiSignature.min,
			identity.multiSignature.publicKeys,
		);

		expect(result).toEqual({ type: "bip39", address: "DMS861mLRrtH47QUMVif3C2rBCAdHbmwsi" });
	});

	it("should generate an output from a publicKey", async () => {
		const result = await subject.fromPublicKey(identity.publicKey);

		expect(result).toEqual({ type: "bip39", address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib" });
	});

	it("should generate an output from a privateKey", async () => {
		const result = await subject.fromPrivateKey(identity.privateKey);

		expect(result).toEqual({ type: "bip39", address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib" });
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.fromWIF(identity.wif);

		expect(result).toEqual({ type: "bip39", address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib" });
	});

	it("should validate an address", async () => {
		await expect(subject.validate(identity.address)).resolves.toBeTrue();
		await expect(subject.validate("AdVSe37niA3uFUPgCgMUH2tMsHF4LpLoiX")).resolves.toBeFalse();
		await expect(subject.validate("ABC")).resolves.toBeFalse();
		await expect(subject.validate("")).resolves.toBeFalse();
		await expect(subject.validate(undefined!)).resolves.toBeFalse();
		await expect(subject.validate(null!)).resolves.toBeFalse();
		await expect(subject.validate(({} as unknown) as string)).resolves.toBeFalse();
	});

	test.each(["fromMnemonic", "fromMultiSignature", "fromPublicKey", "fromPrivateKey", "fromWIF"])(
		"%s() should fail to generate an output from an invalid input",
		(method) => {
			await expect(subject[method](undefined!)).rejects.toThrow(Exceptions.CryptoException);
		},
	);
});
