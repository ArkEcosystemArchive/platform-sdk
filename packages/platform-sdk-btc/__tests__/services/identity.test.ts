import "jest-extended";

import { IdentityService } from "../../src/services/identity";
import { identity } from "../__fixtures__/identity";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.construct({ network: "live" })));

describe("IdentityService", () => {
	describe("#address", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.address({
				passphrase: identity.passphrase,
			})

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a multiSignature", async () => {
			const result: any = await subject.address({
				multiSignature: identity.multiSignature,
			});

			expect(result).toBe("36NUkt6FWUi3LAWBqWRdDmdTWbt91Yvfu7");
		});

		it("should generate an output from a publicKey", async () => {
			const result: any = await subject.address({
				publicKey: identity.publicKey,
			});

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a privateKey", async () => {
			const result: any = await subject.address({
				privateKey: identity.privateKey,
			});

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.address({
				wif: identity.wif,
			});

			expect(result).toBe(identity.address);
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
			const result: any = await subject.publicKey({
				wif: identity.wif,
			});

			expect(result).toBe(identity.publicKey);
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
			const result: any = await subject.privateKey({
				wif: identity.wif,
			});

			expect(result).toBe(identity.privateKey);
		});
	});

	describe("#wif", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.wif({
				passphrase: identity.passphrase,
			});

			expect(result).toBe(identity.wif);
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

		it("should generate an output from a privateKey", async () => {
			const result: any = await subject.keyPair({
				privateKey: identity.privateKey,
			});

			expect(result).toEqual({
				privateKey: identity.privateKey,
				publicKey: identity.publicKey,
			});
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.keyPair({
				wif: identity.wif,
			});

			expect(result).toEqual({
				privateKey: identity.privateKey,
				publicKey: identity.publicKey,
			});
		});
	});
});
