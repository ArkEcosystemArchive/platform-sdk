import "jest-extended";

import { IdentityService } from "../../src/services/identity";
import { identity } from "../__fixtures__/identity";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.construct({})));

describe("IdentityService", () => {
	describe("#getAddress", () => {
		it("should generate an output from a passphrase", async () => {
			await expect(
				subject.getAddress({
					passphrase: identity.passphrase,
				}),
			).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a multiSignature", async () => {
			await expect(
				subject.getAddress({
					multiSignature: identity.multiSignature,
				}),
			).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a publicKey", async () => {
			const result: any = await subject.getAddress({
				publicKey: identity.publicKey,
			});

			expect(result).toBe("b14ab53e38da1c172f877dbc6d65e4a1b0474c3c");
		});

		it("should generate an output from a privateKey", async () => {
			const result: any = await subject.getAddress({
				privateKey: identity.privateKey,
			});

			expect(result).toBe("b14ab53e38da1c172f877dbc6d65e4a1b0474c3c");
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
			await expect(
				subject.getPublicKey({
					passphrase: identity.passphrase,
				}),
			).rejects.toThrow(/is not supported/);
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
			await expect(
				subject.getPrivateKey({
					passphrase: identity.passphrase,
				}),
			).rejects.toThrow(/is not supported/);
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
			await expect(
				subject.getKeyPair({
					passphrase: identity.passphrase,
				}),
			).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a publicKey", async () => {
			await expect(
				subject.getKeyPair({
					publicKey: identity.publicKey,
				}),
			).rejects.toThrow(/is not supported/);
		});

		it("should generate an output from a privateKey", async () => {
			const result: any = await subject.getKeyPair({
				privateKey: identity.privateKey,
			});

			expect(result).toEqual({
				privateKey: "efca4cdd31923b50f4214af5d2ae10e7ac45a5019e9431cc195482d707485378",
				publicKey:
					"5d4392f450262b276652c1fc037606abac500f3160830ce9df53aa70d95ce7cfb8b06010b2f3691c78c65c21eb4cf3dfdbfc0745d89b664ee10435bb3a0f906c",
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
