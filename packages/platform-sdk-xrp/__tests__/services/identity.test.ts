import "jest-extended";

import { IdentityService } from "../../src/services/identity";
import { identity } from "../__fixtures__/identity";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.construct({})));

describe("IdentityService", () => {
	describe("#address", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.address().fromPassphrase(identity.passphrase);

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a publicKey", async () => {
			const result: any = await subject.address().fromPublicKey(identity.publicKey);

			expect(result).toBe(identity.address);
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
	});
});
