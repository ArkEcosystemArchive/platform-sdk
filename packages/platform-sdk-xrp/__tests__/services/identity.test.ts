import "jest-extended";

import { IdentityService } from "../../src/services/identity";
import { identity } from "../__fixtures__/identity";

let subject: IdentityService;

beforeEach(() => (subject = new IdentityService()));

describe("IdentityService", () => {
	describe("#getAddress", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.getAddress({
				passphrase: identity.passphrase,
			});

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a publicKey", async () => {
			const result: any = await subject.getAddress({
				publicKey: identity.publicKey,
			});

			expect(result).toBe(identity.address);
		});
	});

	describe("#getKeyPair", () => {
		it("should generate an output from a passphrase", async () => {
			const result: any = await subject.getKeyPair({
				passphrase: identity.passphrase,
			});

			expect(result).toEqual({
				privateKey: identity.privateKey,
				publicKey: identity.publicKey,
			});
		});
	});
});
