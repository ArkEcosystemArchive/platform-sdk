import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { IdentityService } from ".";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfig())));

describe("#keys", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.keys().fromMnemonic(identity.mnemonic);

		expect(result).toEqual({
			privateKey: identity.privateKey,
			publicKey: identity.publicKey,
		});
	});

	it("should fail from an invalid mnemonic", async () => {
		await expect(subject.keys().fromMnemonic(identity.mnemonic.slice(0, 10))).rejects.toThrowError();
	});

	it("should generate an output from a privateKey", async () => {
		await expect(subject.keys().fromPrivateKey(identity.privateKey)).rejects.toThrow(/is not supported/);
	});

	it("should generate an output from a wif", async () => {
		await expect(subject.keys().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
	});
});