import "jest-extended";

import nock from "nock";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";
import { IdentityService } from "./identity";

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfig())));

describe("IdentityService", () => {
	describe("#address", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.address().fromMnemonic(identity.mnemonic);

			expect(result).toBe(identity.derived.address);
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

		it("should validate an address", async () => {
			await expect(subject.address().validate("AdVSe37niA3uFUPgCgMUH2tMsHF4LpLoiX")).resolves.toBeTrue();
			await expect(subject.address().validate("ABC")).resolves.toBeFalse();
		});
	});

	describe("#publicKey", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.publicKey().fromMnemonic(identity.mnemonic);

			expect(result).toBe(identity.derived.publicKey);
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.publicKey().fromWIF(identity.wif);

			expect(result).toBe(identity.publicKey);
		});
	});

	describe("#privateKey", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.privateKey().fromMnemonic(identity.mnemonic);

			expect(result).toBe(identity.derived.privateKey);
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.privateKey().fromWIF(identity.wif);

			expect(result).toBe(identity.privateKey);
		});
	});

	describe("#wif", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.wif().fromMnemonic(identity.mnemonic);

			expect(result).toBe(identity.derived.wif);
		});
	});

	describe("#keys", () => {
		it("should generate an output from a mnemonic", async () => {
			const result: any = await subject.keys().fromMnemonic(identity.mnemonic);

			expect(result).toEqual({
				privateKey: identity.derived.privateKey,
				publicKey: identity.derived.publicKey,
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
