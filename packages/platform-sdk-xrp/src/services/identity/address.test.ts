import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { IdentityService } from ".";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfig())));

describe("Address", () => {
	it("should generate an output from a publicKey", async () => {
		const result = await subject.address().fromPublicKey(identity.publicKey);

		expect(result).toBe(identity.address);
	});

	it("should generate an output from a secret", async () => {
		const result = await subject.address().fromSecret(identity.mnemonic);

		expect(result).toBe(identity.address);
	});
});