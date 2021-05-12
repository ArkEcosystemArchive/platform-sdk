import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/config";
import { IdentityService } from "./identity";

let subject: IdentityService;

beforeEach(async () => {
	subject = await IdentityService.__construct(createConfig());
});

describe("IdentityService", () => {
	describe("#address", () => {
		it("should generate an output from a mnemonic", async () => {
			const result = await subject.address().fromMnemonic(identity.mnemonic);

			expect(result).toBe(identity.address);
		});

		it("should fail to generate an output from a multiSignature", async () => {
			await expect(
				subject.address().fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys),
			).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a privateKey", async () => {
			const result = await subject.address().fromPrivateKey(identity.privateKey);

			expect(result).toBe(identity.address);
		});

		it("should fail to generate an output from a publicKey", async () => {
			await expect(subject.address().fromPublicKey(identity.publicKey)).rejects.toThrow(/is not supported/);
		});

		it("should fail to generate an output from a wif", async () => {
			await expect(subject.address().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});

		it("should validate an address", async () => {
			await expect(subject.address().validate(identity.address)).resolves.toBeTrue();
			await expect(subject.address().validate(identity.bech32Address)).resolves.toBeTrue();
			await expect(subject.address().validate(identity.address.slice(0, 10))).resolves.toBeFalse();
		});
	});

	describe("#keys", () => {
		it("should generate an output from a mnemonic", async () => {
			const result = await subject.keys().fromMnemonic(identity.mnemonic);

			expect(result).toEqual({
				privateKey: identity.privateKey,
				publicKey: identity.publicKey,
			});
		});

		it("should fail from an invalid mnemonic", async () => {
			await expect(subject.keys().fromMnemonic(identity.mnemonic.slice(0, 10))).rejects.toThrowError();
		});

		it("should generate an output from a privateKey", async () => {
			const result: any = await subject.keys().fromPrivateKey(identity.privateKey);

			expect(result).toEqual({
				privateKey: identity.privateKey,
				publicKey: identity.publicKey,
			});
		});

		it("should fail to generate an output from a wif", async () => {
			await expect(subject.keys().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});
	});

	describe("#privateKey", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.privateKey().fromMnemonic(identity.mnemonic);

			expect(result).toBe(identity.privateKey);
		});

		it("should fail to generate an output from an invalid mnemonic", async () => {
			await expect(subject.privateKey().fromMnemonic(identity.mnemonic.slice(0, 10))).rejects.toThrowError();
		});

		it("should fail to generate an output from a wif", async () => {
			await expect(subject.privateKey().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});
	});

	describe("#publicKey", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.publicKey().fromMnemonic(identity.mnemonic);

			expect(result).toBe(identity.publicKey);
		});

		it("should fail to generate an output from an invalid mnemonic", async () => {
			await expect(subject.publicKey().fromMnemonic(identity.mnemonic.slice(0, 10))).rejects.toThrowError();
		});

		it("should fail to generate an output from a multiSignature", async () => {
			await expect(
				subject.publicKey().fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys),
			).rejects.toThrow(/is not supported/);
		});

		it("should fail to generate an output from a wif", async () => {
			await expect(subject.publicKey().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});
	});

	describe("#wif", () => {
		it("should fail to generate an output from a mnemonic", async () => {
			await expect(subject.wif().fromMnemonic(identity.mnemonic)).rejects.toThrow(/is not supported/);
		});
	});

	it("should do nothing on destruct", async () => {
		await expect(subject.__destruct()).resolves.toBeUndefined();
	});
});
