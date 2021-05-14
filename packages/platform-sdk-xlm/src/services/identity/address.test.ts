import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { IdentityService } from ".";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfig())));

describe("#address", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.address().fromMnemonic(identity.mnemonic);

		expect(result).toBe(identity.address);
	});

	it("should generate an output from a private key", async () => {
		const result = await subject.address().fromPrivateKey(identity.privateKey);

		expect(result).toBe(identity.address);
	});
});