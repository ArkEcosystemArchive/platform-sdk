import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { IdentityService } from ".";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfig())));

describe("#wif", () => {
	it("should generate an output from a mnemonic", async () => {
		await expect(subject.wif().fromMnemonic(identity.mnemonic)).rejects.toThrow(/is not supported/);
	});
});