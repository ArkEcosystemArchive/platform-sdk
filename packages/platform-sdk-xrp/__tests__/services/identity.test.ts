import "jest-extended";

import { IdentityService } from "../../src/services/identity";
import { identity } from "../__fixtures__/identity";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.construct({})));

describe("IdentityService", () => {
	describe("#address", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.address({
				passphrase: identity.passphrase,
			});

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a publicKey", async () => {
			const result: any = await subject.address({
				publicKey: identity.publicKey,
			});

			expect(result).toBe(identity.address);
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
	});
});
