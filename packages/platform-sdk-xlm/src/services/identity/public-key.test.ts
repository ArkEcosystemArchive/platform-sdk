import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { IdentityService } from ".";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfig())));

describe("#publicKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.publicKey().fromMnemonic(identity.mnemonic);

		expect(result).toBe(identity.publicKey);
	});
});
