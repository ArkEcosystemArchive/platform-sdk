import "jest-extended";

import { IdentityService } from "../../src/services/identity";
import { identity } from "../__fixtures__/identity";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.construct({ network: "devnet" })));

describe("IdentityService", () => {
	describe("#getAddress", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.getAddress({
				passphrase: identity.passphrase,
			});

			expect(result).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
		});

		it("should generate an output from a multiSignature", async () => {
			const result: any = await subject.getAddress({
				multiSignature: identity.multiSignature,
			});

			expect(result).toBe("DMS861mLRrtH47QUMVif3C2rBCAdHbmwsi");
		});

		it("should generate an output from a publicKey", async () => {
			const result: any = await subject.getAddress({
				publicKey: identity.publicKey,
			});

			expect(result).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.getAddress({
				wif: identity.wif,
			});

			expect(result).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
		});
	});

	describe("#getPublicKey", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.getPublicKey({
				passphrase: identity.passphrase,
			});

			expect(result).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
		});

		it("should generate an output from a multiSignature", async () => {
			const result: any = await subject.getPublicKey({
				multiSignature: identity.multiSignature,
			});

			expect(result).toBe("0279f05076556da7173610a7676399c3620276ebbf8c67552ad3b1f26ec7627794");
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.getPublicKey({
				wif: identity.wif,
			});

			expect(result).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
		});
	});

	describe("#getPrivateKey", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.getPrivateKey({
				passphrase: identity.passphrase,
			});

			expect(result).toBe("d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712");
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.getPrivateKey({
				wif: identity.wif,
			});

			expect(result).toBe("d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712");
		});
	});

	describe("#getWIF", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.getWIF({
				passphrase: identity.passphrase,
			});

			expect(result).toBe("SGq4xLgZKCGxs7bjmwnBrWcT4C1ADFEermj846KC97FSv1WFD1dA");
		});
	});

	describe("#getKeyPair", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.getKeyPair({
				passphrase: identity.passphrase,
			});

			expect(result).toEqual({
				privateKey: "d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712",
				publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			});
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.getKeyPair({
				wif: identity.wif,
			});

			expect(result).toEqual({
				privateKey: "d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712",
				publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			});
		});
	});
});
