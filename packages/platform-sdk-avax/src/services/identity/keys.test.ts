import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { IdentityService } from ".";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfig())));

describe("Keys", () => {
	it("should generate an output from a mnemonic", async () => {
		await expect(subject.keys().fromMnemonic(identity.mnemonic)).resolves.toEqual({
			publicKey: identity.publicKey,
			privateKey: identity.privateKey,
		});
	});

	it("should generate an output from a privateKey", async () => {
		await expect(subject.keys().fromPrivateKey(identity.privateKey)).resolves.toEqual({
			publicKey: identity.publicKey,
			privateKey: identity.privateKey,
		});
	});

	it("should generate an output from a wif", async () => {
		await expect(subject.keys().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
	});
});