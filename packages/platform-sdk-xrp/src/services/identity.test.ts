import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../test/helpers";
import { IdentityService } from "./identity";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfig())));

describe("IdentityService", () => {
	describe("#address", () => {
		it("should generate an output from a publicKey", async () => {
			const result: any = await subject.address().fromPublicKey(identity.publicKey);

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a secret", async () => {
			const result: any = await subject.address().fromSecret(identity.mnemonic);

			expect(result).toBe(identity.address);
		});
	});

	describe("#keys", () => {
		it("should generate an output from a secret", async () => {
			const result: any = await subject.keys().fromSecret(identity.mnemonic);

			expect(result).toEqual({
				privateKey: identity.privateKey,
				publicKey: identity.publicKey,
			});
		});
	});
});
