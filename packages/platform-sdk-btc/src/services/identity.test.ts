import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";
import { IdentityService } from "./identity";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfig())));

describe("IdentityService", () => {
	describe("#address", () => {
		it("should generate an output from a mnemonic (BIP44)", async () => {
			const result: any = await subject.address().fromMnemonic(identity.mnemonic, { bip44: { account: 0 } });

			expect(result).toBe(identity.addressBIP44);
		});

		it("should generate an output from a mnemonic (BIP49)", async () => {
			const result: any = await subject.address().fromMnemonic(identity.mnemonic, { bip49: { account: 0 } });

			expect(result).toBe(identity.addressBIP49);
		});

		it("should generate an output from a mnemonic (BIP84)", async () => {
			const result: any = await subject.address().fromMnemonic(identity.mnemonic, { bip84: { account: 0 } });

			expect(result).toBe(identity.addressBIP84);
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
			const result: any = await subject.publicKey().fromWIF(identity.wif);

			expect(result).toBe(identity.publicKey);
		});
	});

	describe("#privateKey", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.privateKey().fromMnemonic(identity.mnemonic);

			expect(result).toBe(identity.privateKey);
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.privateKey().fromWIF(identity.wif);

			expect(result).toBe(identity.privateKey);
		});
	});

	describe("#wif", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.wif().fromMnemonic(identity.mnemonic);

			expect(result).toBe(identity.wif);
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
