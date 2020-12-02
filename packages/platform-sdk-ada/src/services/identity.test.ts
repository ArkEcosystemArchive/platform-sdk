import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";
import { IdentityService } from "./identity";

let subject: IdentityService;

beforeEach(async () => {
	subject = await IdentityService.construct(createConfig());
});

describe("IdentityService", () => {
	describe("#address", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.address().fromMnemonic(identity.mnemonic);

			expect(result).toBe(identity.address);
		});

		it("should fail to generate an output from a multiSignature", async () => {
			expect(subject
				.address()
				.fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys)
			).rejects.toThrow(/is not supported/);
		});

		it("should fail to generate an output from a privateKey", async () => {
			expect(subject.address().fromPrivateKey(identity.privateKey)).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a publicKey", async () => {
			const result: any = await subject.address().fromPublicKey(identity.extPublicKey);

			expect(result).toBe(identity.address);
		});

		it("should fail to generate an output from a wif", async () => {
			expect(subject.address().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});

		it("should validate an address", async () => {
			expect(subject.address().validate(identity.address)).resolves.toBeTrue();
			expect(subject.address().validate(identity.address.slice(0, 10))).resolves.toBeFalse();
		});
	});

	describe("#keys", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.keys().fromMnemonic(identity.mnemonic);

			expect(result).toEqual({
				privateKey: identity.privateKey,
				publicKey: identity.publicKey,
			});
		});

		it("should fail from an invalid mnemonic", async () => {
			expect(subject.keys().fromMnemonic(identity.mnemonic.slice(0, 10))).rejects.toThrowError();
		});

		it("should generate an output from a privateKey", async () => {
			expect(subject.keys().fromPrivateKey(identity.privateKey)).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a wif", async () => {
			expect(subject.keys().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});
	});

	describe("#privateKey", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.privateKey().fromMnemonic(identity.mnemonic);

			expect(result).toBe(identity.privateKey);
		});

		it("should fail to generate an output from an invalid mnemonic", async () => {
			expect(subject.privateKey().fromMnemonic(identity.mnemonic.slice(0, 10))).rejects.toThrowError();
		});

		it("should fail to generate an output from a wif", async () => {
			expect(subject.privateKey().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});
	});

	describe("#publicKey", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.publicKey().fromMnemonic(identity.mnemonic);

			expect(result).toBe(identity.publicKey);
		});

		it("should fail to generate an output from an invalid mnemonic", async () => {
			expect(subject.publicKey().fromMnemonic(identity.mnemonic.slice(0, 10))).rejects.toThrowError();
		});

		it("should fail to generate an output from a multiSignature", async () => {
			expect(subject
				.publicKey()
				.fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys)
			).rejects.toThrow(/is not supported/);
		});

		it("should fail to generate an output from a wif", async () => {
			expect(subject.publicKey().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});
	});

	describe("#wif", () => {
		it("should fail to generate an output from a mnemonic", async () => {
			expect(subject.wif().fromMnemonic(identity.mnemonic)).rejects.toThrow(/is not supported/);
		});
	});

	it("should do nothing on destruct", async () => {
		expect(subject.destruct()).resolves.toHaveBeenCalled();
	});
});
