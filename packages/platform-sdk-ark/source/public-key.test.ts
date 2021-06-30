import "jest-extended";

import { Exceptions } from "@arkecosystem/platform-sdk";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { PublicKeyService } from "./public-key.service";

let subject: PublicKeyService;

beforeEach(async () => {
	subject = createService(PublicKeyService);
});

describe("PublicKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toEqual({ publicKey: identity.publicKey });
	});

	it("should fail to generate an output from an invalid mnemonic", async () => {
		await expect(subject.fromMnemonic(undefined!)).rejects.toThrow(Exceptions.CryptoException);
	});

	it("should generate an output from a multiSignature", async () => {
		const result = await subject.fromMultiSignature(
			identity.multiSignature.min,
			identity.multiSignature.publicKeys,
		);

		expect(result).toEqual({ publicKey: "0279f05076556da7173610a7676399c3620276ebbf8c67552ad3b1f26ec7627794" });
	});

	it("should fail to generate an output from a multiSignature", async () => {
		await expect(subject.fromMultiSignature(-1, [])).rejects.toThrow(Exceptions.CryptoException);
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.fromWIF(identity.wif);

		expect(result).toEqual({ publicKey: identity.publicKey });
	});

	it("should fail to generate an output from a wif", async () => {
		await expect(subject.fromWIF(undefined!)).rejects.toThrow(Exceptions.CryptoException);
	});
});
