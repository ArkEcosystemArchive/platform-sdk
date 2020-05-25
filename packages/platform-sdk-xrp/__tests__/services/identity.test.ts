import "jest-extended";

import { IdentityService } from "../../src/services/identity";
import { identity } from "../__fixtures__/identity";
import { createConfig } from "../helpers";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.construct(createConfig())));

describe("IdentityService", () => {
	describe("#address", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.address().fromMnemonic(identity.passphrase);

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a publicKey", async () => {
			const result: any = await subject.address().fromPublicKey(identity.publicKey);

			expect(result).toBe(identity.address);
		});
	});

	describe("#keys", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.keys().fromMnemonic(identity.passphrase);

			expect(result).toEqual({
				privateKey: identity.privateKey,
				publicKey: identity.publicKey,
			});
		});
	});
});
