import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { Address } from "./address";

let subject: Address;

beforeEach(async () => (subject = new Address()));

describe("Address", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toBe(identity.address);
	});

	it("should generate an output from a multiSignature", async () => {
		await expect(
			subject.fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys),
		).rejects.toThrow(/is not supported/);
	});

	it("should generate an output from a publicKey", async () => {
		const result = await subject.fromPublicKey(identity.publicKey);

		expect(result).toBe(identity.address);
	});

	it("should generate an output from a privateKey", async () => {
		await expect(subject.fromPrivateKey(identity.privateKey)).rejects.toThrow(/is not supported/);
	});

	it("should generate an output from a wif", async () => {
		await expect(subject.fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
	});

	it("should validate an address", async () => {
		await expect(subject.validate(identity.address)).resolves.toBeTrue();
		await expect(subject.validate("ABC")).resolves.toBeFalse();
	});
});
