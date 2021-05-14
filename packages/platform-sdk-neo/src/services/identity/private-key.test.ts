import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { IdentityService } from ".";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfig())));

describe("PrivateKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result: any = await subject.privateKey().fromMnemonic(identity.mnemonic);

		expect(result).toBe(identity.privateKey);
	});

	it("should generate an output from a wif", async () => {
		const result: any = await subject.privateKey().fromWIF(identity.wif);

		expect(result).toBe(identity.privateKey);
	});
});
