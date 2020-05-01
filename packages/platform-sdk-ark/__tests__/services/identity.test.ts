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

			expect(result).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
		});

		it("should generate an output from a multiSignature", async () => {
			const result: any = await subject.address({
				multiSignature: identity.multiSignature,
			});

			expect(result).toBe("DMS861mLRrtH47QUMVif3C2rBCAdHbmwsi");
		});

		it("should generate an output from a publicKey", async () => {
			const result: any = await subject.address({
				publicKey: identity.publicKey,
			});

			expect(result).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.address({
				wif: identity.wif,
			});

			expect(result).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
		});
	});

	describe("#publicKey", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.publicKey({
				passphrase: identity.passphrase,
			});

			expect(result).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
		});

		it("should generate an output from a multiSignature", async () => {
			const result: any = await subject.publicKey({
				multiSignature: identity.multiSignature,
			});

			expect(result).toBe("0279f05076556da7173610a7676399c3620276ebbf8c67552ad3b1f26ec7627794");
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.publicKey({
				wif: identity.wif,
			});

			expect(result).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
		});
	});

	describe("#privateKey", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.privateKey({
				passphrase: identity.passphrase,
			});

			expect(result).toBe("d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712");
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.privateKey({
				wif: identity.wif,
			});

			expect(result).toBe("d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712");
		});
	});

	describe("#wif", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.wif({
				passphrase: identity.passphrase,
			});

			expect(result).toBe("SGq4xLgZKCGxs7bjmwnBrWcT4C1ADFEermj846KC97FSv1WFD1dA");
		});
	});

	describe("#keyPair", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.keyPair({
				passphrase: identity.passphrase,
			});

			expect(result).toEqual({
				privateKey: "d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712",
				publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			});
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.keyPair({
				wif: identity.wif,
			});

			expect(result).toEqual({
				privateKey: "d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712",
				publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			});
		});
	});
});
