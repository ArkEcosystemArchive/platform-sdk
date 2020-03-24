import "jest-extended";

import { Bitcoin } from "../../../src/identities/adapters/btc";
import { identity } from "./__fixtures__/btc";

let subject: Bitcoin;

beforeEach(() => (subject = new Bitcoin("devnet")));

describe("Bitcoin", () => {
	describe("#getAddress", () => {
		it("should generate an output from a passphrase", () => {
			expect(() =>
				subject.getAddress({
					passphrase: identity.passphrase,
				}),
			).toThrow(/is not supported/);
		});

		it("should generate an output from a multiSignature", () => {
			const result: any = subject.getAddress({
				multiSignature: identity.multiSignature,
			});

			expect(result).toBe("36NUkt6FWUi3LAWBqWRdDmdTWbt91Yvfu7");
		});

		it("should generate an output from a publicKey", () => {
			const result: any = subject.getAddress({
				publicKey: identity.publicKey,
			});

			expect(result).toBe("1QLUsTp9fuNw99wmYfH8QC7XaiHgfstsbM");
		});

		it("should generate an output from a privateKey", () => {
			const result: any = subject.getAddress({
				privateKey: identity.privateKey,
			});

			expect(result).toBe("1QLUsTp9fuNw99wmYfH8QC7XaiHgfstsbM");
		});

		it("should generate an output from a wif", () => {
			const result: any = subject.getAddress({
				wif: identity.wif,
			});

			expect(result).toBe("1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH");
		});
	});

	describe("#getPublicKey", () => {
		it("should generate an output from a passphrase", () => {
			expect(() =>
				subject.getPublicKey({
					passphrase: identity.passphrase,
				}),
			).toThrow(/is not supported/);
		});

		it("should generate an output from a multiSignature", () => {
			expect(() =>
				subject.getPublicKey({
					multiSignature: identity.multiSignature,
				}),
			).toThrow(/is not supported/);
		});

		it("should generate an output from a wif", () => {
			const result: any = subject.getPublicKey({
				wif: identity.wif,
			});

			expect(result).toBe("0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798");
		});
	});

	describe("#getPrivateKey", () => {
		it("should generate an output from a passphrase", () => {
			expect(() =>
				subject.getPrivateKey({
					passphrase: identity.passphrase,
				}),
			).toThrow(/is not supported/);
		});

		it("should generate an output from a wif", () => {
			const result: any = subject.getPrivateKey({
				wif: identity.wif,
			});

			expect(result).toBe("0000000000000000000000000000000000000000000000000000000000000001");
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
			expect(() =>
				subject.getKeyPair({
					passphrase: identity.passphrase,
				}),
			).toThrow(/is not supported/);
		});

		it("should generate an output from a privateKey", () => {
			const result: any = subject.getKeyPair({
				privateKey: identity.privateKey,
			});

			expect(result).toEqual({
				privateKey: "d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712",
				publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			});
		});

		it("should generate an output from a wif", () => {
			const result: any = subject.getKeyPair({
				wif: identity.wif,
			});

			expect(result).toEqual({
				privateKey: "0000000000000000000000000000000000000000000000000000000000000001",
				publicKey: "0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
			});
		});
	});
});
