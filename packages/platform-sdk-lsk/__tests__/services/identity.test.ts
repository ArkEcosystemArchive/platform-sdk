import "jest-extended";

import { IdentityService } from "../../src/services/identity";
import { identity } from "../__fixtures__/identity";
import { createConfig } from "../helpers";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.construct(createConfig())));

describe("IdentityService", () => {
	describe("#address", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.address().fromMnemonic(identity.passphrase);

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a multiSignature", async () => {
			await expect(
				subject.address().fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys),
			).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a publicKey", async () => {
			const result: any = await subject.address().fromPublicKey(identity.publicKey);

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a privateKey", async () => {
			await expect(subject.address().fromPrivateKey(identity.privateKey)).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a wif", async () => {
			await expect(subject.address().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});
	});

	describe("#publicKey", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.publicKey().fromMnemonic(identity.passphrase);

			expect(result).toBe(identity.publicKey);
		});

		it("should generate an output from a multiSignature", async () => {
			await expect(
				subject.publicKey().fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys),
			).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a wif", async () => {
			await expect(subject.publicKey().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});
	});

	describe("#privateKey", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.privateKey().fromMnemonic(identity.passphrase);

			expect(result).toBe(identity.privateKey);
		});

		it("should generate an output from a wif", async () => {
			await expect(subject.privateKey().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});
	});

	describe("#wif", () => {
		it("should generate an output from a passphrase", async () => {
			await expect(subject.wif().fromMnemonic(identity.passphrase)).rejects.toThrow(/is not supported/);
		});
	});

	describe("#keys", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.keys().fromMnemonic(identity.passphrase);

			expect(result).toEqual({
				privateKey: identity.privateKey,
				publicKey: identity.publicKey,
			});
		});

		it("should generate an output from a wif", async () => {
			await expect(subject.keys().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});
	});
});
