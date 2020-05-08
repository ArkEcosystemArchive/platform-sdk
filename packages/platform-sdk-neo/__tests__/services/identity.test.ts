import "jest-extended";

import { IdentityService } from "../../src/services/identity";
import { identity } from "../__fixtures__/identity";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.construct({ network: "devnet" })));

describe("IdentityService", () => {
	describe("#address", () => {
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
		it("should generate an output from a privateKey", async () => {
			const result: any = await subject.publicKey({
				privateKey: identity.privateKey,
			});

			expect(result).toBe(identity.publicKey);
		});

		it("should generate an output from a wif", async () => {
			const result: any = await subject.publicKey({
				wif: identity.wif,
			});

			expect(result).toBe(identity.publicKey);
		});
	});

	describe("#privateKey", () => {
		it("should generate an output from a wif", async () => {
			const result: any = await subject.privateKey({
				wif: identity.wif,
			});

			expect(result).toBe(identity.privateKey);
		});
	});

	describe("#wif", () => {
		it("should generate an output from a privateKey", async () => {
			const result: any = await subject.wif({
				privateKey: identity.privateKey,
			});

			expect(result).toBe(identity.wif);
		});
	});

	describe("#keyPair", () => {
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
