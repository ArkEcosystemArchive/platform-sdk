import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";
import { IdentityService } from "./identity";

let subject: IdentityService;

beforeEach(async () => {
	subject = await IdentityService.__construct(
		createConfig(undefined, {
			networkConfiguration: {
				crypto: require(`${__dirname}/../../test/fixtures/client/cryptoConfiguration.json`).data,
				status: require(`${__dirname}/../../test/fixtures/client/syncing.json`).data,
			},
		}),
	);
});

describe("IdentityService", () => {
	describe("#address", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.address().fromMnemonic(identity.mnemonic);

			expect(result).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
		});

		it("should generate an output from a multiSignature", async () => {
			const result: any = await subject
				.address()
				.fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys);

			expect(result).toBe("DMS861mLRrtH47QUMVif3C2rBCAdHbmwsi");
		});

		it("should generate an output from a publicKey", async () => {
			const result: any = await subject.address().fromPublicKey(identity.publicKey);

			expect(result).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
		});

		it("should generate an output from a privateKey", async () => {
			const result: any = await subject.address().fromPrivateKey(identity.privateKey);

			expect(result).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.address().fromWIF(identity.wif);

			expect(result).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
		});

		it("should validate an address", async () => {
			await expect(subject.address().validate(identity.address)).resolves.toBeTrue();
			await expect(subject.address().validate("AdVSe37niA3uFUPgCgMUH2tMsHF4LpLoiX")).resolves.toBeFalse();
			await expect(subject.address().validate("ABC")).resolves.toBeFalse();
		});
	});

	describe("#publicKey", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.publicKey().fromMnemonic(identity.mnemonic);

			expect(result).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
		});

		it("should generate an output from a multiSignature", async () => {
			const result: any = await subject
				.publicKey()
				.fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys);

			expect(result).toBe("0279f05076556da7173610a7676399c3620276ebbf8c67552ad3b1f26ec7627794");
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.publicKey().fromWIF(identity.wif);

			expect(result).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
		});
	});

	describe("#privateKey", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.privateKey().fromMnemonic(identity.mnemonic);

			expect(result).toBe("d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712");
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.privateKey().fromWIF(identity.wif);

			expect(result).toBe("d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712");
		});
	});

	describe("#wif", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.wif().fromMnemonic(identity.mnemonic);

			expect(result).toBe("SGq4xLgZKCGxs7bjmwnBrWcT4C1ADFEermj846KC97FSv1WFD1dA");
		});
	});

	describe("#keys", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.keys().fromMnemonic(identity.mnemonic);

			expect(result).toEqual({
				privateKey: "d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712",
				publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			});
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.keys().fromWIF(identity.wif);

			expect(result).toEqual({
				privateKey: "d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712",
				publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			});
		});
	});
});
