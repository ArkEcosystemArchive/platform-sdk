import "jest-extended";

import { IdentityService } from "../../src/services/identity";
import { identity } from "../__fixtures__/identity";

let subject: IdentityService;

beforeEach(() => (subject = new IdentityService()));

describe("IdentityService", () => {
	describe("#getAddress", () => {
		it("should generate an output from a passphrase", () => {
			const result: any = subject.getAddress({
				passphrase: identity.passphrase,
			});

			expect(result).toBe(identity.address);
		});

		it("should generate an output from a publicKey", () => {
			const result: any = subject.getAddress({
				publicKey: identity.publicKey,
			});

			expect(result).toBe(identity.address);
		});
	});

	describe("#getKeyPair", () => {
		it("should generate an output from a passphrase", () => {
			const result: any = subject.getKeyPair({
				passphrase: identity.passphrase,
			});

			expect(result).toEqual({
				privateKey: identity.privateKey,
				publicKey: identity.publicKey,
			});
		});
	});
});
