import "jest-extended";

import { IdentityService } from "../../src/services/identity";
import { identity } from "../__fixtures__/identity";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.construct({ network: "live" })));

describe("IdentityService", () => {
	describe("#address", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.address().fromPassphrase(identity.passphrase);

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a multiSignature", async () => {
			const result: any = await subject
				.address()
				.fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys);

			expect(result).toBe("36NUkt6FWUi3LAWBqWRdDmdTWbt91Yvfu7");
		});

		it("should generate an output from a publicKey", async () => {
			const result: any = await subject.address().fromPublicKey(identity.publicKey);

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a privateKey", async () => {
			const result: any = await subject.address().fromPrivateKey(identity.privateKey);

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.address().fromWIF(identity.wif);

			expect(result).toBe(identity.address);
		});
	});

	describe("#publicKey", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.publicKey().fromPassphrase(identity.passphrase);

			expect(result).toBe(identity.publicKey);
		});

		it("should generate an output from a multiSignature", async () => {
			await expect(
				subject.publicKey().fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys),
			).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.publicKey().fromWIF(identity.wif);

			expect(result).toBe(identity.publicKey);
		});
	});

	describe("#privateKey", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.privateKey().fromPassphrase(identity.passphrase);

			expect(result).toBe(identity.privateKey);
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.privateKey().fromWIF(identity.wif);

			expect(result).toBe(identity.privateKey);
		});
	});

	describe("#wif", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.wif().fromPassphrase(identity.passphrase);

			expect(result).toBe(identity.wif);
		});
	});

	describe("#keys", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.keys().fromPassphrase(identity.passphrase);

			expect(result).toEqual({
				privateKey: identity.privateKey,
				publicKey: identity.publicKey,
			});
		});

		it("should generate an output from a privateKey", async () => {
			const result: any = await subject.keys().fromPrivateKey(identity.privateKey);

			expect(result).toEqual({
				privateKey: identity.privateKey,
				publicKey: identity.publicKey,
			});
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.keys().fromWIF(identity.wif);

			expect(result).toEqual({
				privateKey: identity.privateKey,
				publicKey: identity.publicKey,
			});
		});
	});
});
