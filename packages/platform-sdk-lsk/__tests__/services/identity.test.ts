import "jest-extended";

import { IdentityService } from "../../src/services/identity";
import { identity } from "../__fixtures__/identity";

let subject: IdentityService;

beforeEach(() => (subject = new IdentityService("devnet")));

describe("IdentityService", () => {
	describe("#getAddress", () => {
		it("should generate an output from a passphrase", () => {
			const result: any = subject.getAddress({
				passphrase: identity.passphrase,
			});

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a multiSignature", () => {
			expect(() =>
				subject.getAddress({
					multiSignature: identity.multiSignature,
				}),
			).toThrow(/is not supported/);
		});

		it("should generate an output from a publicKey", () => {
			const result: any = subject.getAddress({
				publicKey: identity.publicKey,
			});

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a privateKey", () => {
			expect(() =>
				subject.getAddress({
					privateKey: identity.privateKey,
				}),
			).toThrow(/is not supported/);
		});

		it("should generate an output from a wif", () => {
			expect(() =>
				subject.getAddress({
					wif: identity.wif,
				}),
			).toThrow(/is not supported/);
		});
	});

	describe("#getPublicKey", () => {
		it("should generate an output from a passphrase", () => {
			const result: any = subject.getPublicKey({
				passphrase: identity.passphrase,
			});

			expect(result).toBe(identity.publicKey);
		});

		it("should generate an output from a multiSignature", () => {
			expect(() =>
				subject.getPublicKey({
					multiSignature: identity.multiSignature,
				}),
			).toThrow(/is not supported/);
		});

		it("should generate an output from a wif", () => {
			expect(() =>
				subject.getPublicKey({
					wif: identity.wif,
				}),
			).toThrow(/is not supported/);
		});
	});

	describe("#getPrivateKey", () => {
		it("should generate an output from a passphrase", () => {
			const result: any = subject.getPrivateKey({
				passphrase: identity.passphrase,
			});

			expect(result).toBe(identity.privateKey);
		});

		it("should generate an output from a wif", () => {
			expect(() =>
				subject.getPrivateKey({
					wif: identity.wif,
				}),
			).toThrow(/is not supported/);
		});
	});

	describe("#getWIF", () => {
		it("should generate an output from a passphrase", () => {
			expect(() =>
				subject.getWIF({
					passphrase: identity.passphrase,
				}),
			).toThrow(/is not supported/);
		});
	});

	describe("#getKeyPair", () => {
		it("should generate an output from a passphrase", () => {
			const result: any = subject.getKeyPair({
				passphrase: identity.passphrase,
			});

			expect(result).toEqual({
				privateKey: identity.privateKey,
				publicKey: identity.publicKey,
			});
		});

		it("should generate an output from a wif", () => {
			expect(() =>
				subject.getKeyPair({
					wif: identity.wif,
				}),
			).toThrow(/is not supported/);
		});
	});
});
