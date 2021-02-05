import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";
import { IdentityService } from "./identity";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfig())));

describe("IdentityService", () => {
	describe("#address", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.address().fromMnemonic(identity.mnemonic);

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a multiSignature", async () => {
			await expect(
				subject.address().fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys),
			).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a publicKey", async () => {
			await expect(subject.address().fromPublicKey(identity.publicKey)).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a privateKey", async () => {
			await expect(subject.address().fromPrivateKey(identity.privateKey)).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a wif", async () => {
			await expect(subject.address().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});
	});

	describe("#publicKey", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.publicKey().fromMnemonic(identity.mnemonic);

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
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.privateKey().fromMnemonic(identity.mnemonic);

			expect(result).toBe(identity.privateKey);
		});

		it("should generate an output from a wif", async () => {
			await expect(subject.privateKey().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});
	});

	describe("#wif", () => {
		it("should generate an output from a mnemonic", async () => {
			await expect(subject.wif().fromMnemonic(identity.mnemonic)).rejects.toThrow(/is not supported/);
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

		it("should generate an output from a wif", async () => {
			await expect(subject.keys().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
		});
	});
});
