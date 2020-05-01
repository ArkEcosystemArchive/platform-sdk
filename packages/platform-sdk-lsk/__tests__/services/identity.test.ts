import "jest-extended";

import { IdentityService } from "../../src/services/identity";
import { identity } from "../__fixtures__/identity";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.construct({ network: "devnet" })));

describe("IdentityService", () => {
	describe("#address", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.address({
				passphrase: identity.passphrase,
			});

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a multiSignature", async () => {
			await expect(
				subject.address({
					multiSignature: identity.multiSignature,
				}),
			).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a publicKey", async () => {
			const result: any = await subject.address({
				publicKey: identity.publicKey,
			});

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a privateKey", async () => {
			await expect(
				subject.address({
					privateKey: identity.privateKey,
				}),
			).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a wif", async () => {
			await expect(
				subject.address({
					wif: identity.wif,
				}),
			).rejects.toThrow(/is not supported/);
		});
	});

	describe("#publicKey", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.publicKey({
				passphrase: identity.passphrase,
			});

			expect(result).toBe(identity.publicKey);
		});

		it("should generate an output from a multiSignature", async () => {
			await expect(
				subject.publicKey({
					multiSignature: identity.multiSignature,
				}),
			).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a wif", async () => {
			await expect(
				subject.publicKey({
					wif: identity.wif,
				}),
			).rejects.toThrow(/is not supported/);
		});
	});

	describe("#privateKey", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.privateKey({
				passphrase: identity.passphrase,
			});

			expect(result).toBe(identity.privateKey);
		});

		it("should generate an output from a wif", async () => {
			await expect(
				subject.privateKey({
					wif: identity.wif,
				}),
			).rejects.toThrow(/is not supported/);
		});
	});

	describe("#wif", () => {
		it("should generate an output from a passphrase", async () => {
			await expect(
				subject.wif({
					passphrase: identity.passphrase,
				}),
			).rejects.toThrow(/is not supported/);
		});
	});

	describe("#keyPair", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.keyPair({
				passphrase: identity.passphrase,
			});

			expect(result).toEqual({
				privateKey: identity.privateKey,
				publicKey: identity.publicKey,
			});
		});

		it("should generate an output from a wif", async () => {
			await expect(
				subject.keyPair({
					wif: identity.wif,
				}),
			).rejects.toThrow(/is not supported/);
		});
	});
});
