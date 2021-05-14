import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { IdentityService } from ".";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfig())));

describe("#address", () => {
	it("should generate an output from a mnemonic", async () => {
		await expect(subject.address().fromMnemonic(identity.mnemonic)).resolves.toBe(identity.address);
	});

	it("should fail to generate an output from a multiSignature", async () => {
		await expect(subject.address().fromMultiSignature(0, [])).rejects.toThrow(/is not supported/);
	});

	it("should fail to generate an output from a privateKey", async () => {
		await expect(subject.address().fromPrivateKey(identity.privateKey)).resolves.toBe(identity.address);
	});

	it("should fail to generate an output from a publicKey", async () => {
		await expect(subject.address().fromPublicKey(identity.publicKey)).rejects.toThrow(/is not supported/);
	});

	it("should fail to generate an output from a wif", async () => {
		await expect(subject.address().fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
	});

	it("should fail to validate an address", async () => {
		await expect(subject.address().validate(identity.address)).resolves.toBeTrue();
	});
});