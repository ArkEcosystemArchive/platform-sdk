import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { IdentityService } from ".";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfig())));

describe("PrivateKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.privateKey().fromMnemonic(identity.mnemonic);

		expect(result).toBe(identity.privateKey);
	});

	it("should fail to generate an output from an invalid mnemonic", async () => {
		await expect(subject.privateKey().fromMnemonic(identity.mnemonic.slice(0, 10))).rejects.toThrowError();
	});

	it("should fail to generate an output from a wif", async () => {
		await expect(subject.privateKey().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
	});
});
