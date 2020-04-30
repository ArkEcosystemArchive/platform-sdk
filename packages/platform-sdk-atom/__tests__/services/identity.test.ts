import "jest-extended";

import { IdentityService } from "../../src/services/identity";
import { identity } from "../__fixtures__/identity";

let subject: IdentityService;

beforeEach(() => (subject = new IdentityService()));

describe("IdentityService", () => {
	describe("#getAddress", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.getAddress({
				passphrase: identity.passphrase,
			});

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a multiSignature", async () => {
			await expect(
				subject.getAddress({
					multiSignature: identity.multiSignature,
				}),
			).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a publicKey", async () => {
			await expect(
				subject.getAddress({
					publicKey: identity.publicKey,
				}),
			).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a privateKey", async () => {
			await expect(
				subject.getAddress({
					privateKey: identity.privateKey,
				}),
			).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a wif", async () => {
			await expect(
				subject.getAddress({
					wif: identity.wif,
				}),
			).rejects.toThrow(/is not supported/);
		});
	});

	describe("#getPublicKey", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.getPublicKey({
				passphrase: identity.passphrase,
			});

			expect(result).toBe(identity.publicKey);
		});

		it("should generate an output from a multiSignature", async () => {
			await expect(
				subject.getPublicKey({
					multiSignature: identity.multiSignature,
				}),
			).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a wif", async () => {
			await expect(
				subject.getPublicKey({
					wif: identity.wif,
				}),
			).rejects.toThrow(/is not supported/);
		});
	});

	describe("#getPrivateKey", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.getPrivateKey({
				passphrase: identity.passphrase,
			});

			expect(result).toBe(identity.privateKey);
		});

		it("should generate an output from a wif", async () => {
			await expect(
				subject.getPrivateKey({
					wif: identity.wif,
				}),
			).rejects.toThrow(/is not supported/);
		});
	});

	describe("#getWIF", () => {
		it("should generate an output from a passphrase", async () => {
			await expect(
				subject.getWIF({
					passphrase: identity.passphrase,
				}),
			).rejects.toThrow(/is not supported/);
		});
	});

	describe("#getKeyPair", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.getKeyPair({
				passphrase: identity.passphrase,
			});

			expect(result).toEqual({
				privateKey: identity.privateKey,
				publicKey: identity.publicKey,
			});
		});

		it("should generate an output from a wif", async () => {
			await expect(
				subject.getKeyPair({
					wif: identity.wif,
				}),
			).rejects.toThrow(/is not supported/);
		});
	});
});
