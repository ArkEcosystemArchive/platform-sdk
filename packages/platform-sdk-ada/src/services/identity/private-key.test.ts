import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { PrivateKey } from "./private-key";

let subject: PrivateKey;

beforeEach(async () => (subject = new PrivateKey()));

describe("#privateKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toBe(identity.privateKey);
	});

	it("should fail to generate an output from an invalid mnemonic", async () => {
		await expect(subject.fromMnemonic(identity.mnemonic.slice(0, 10))).rejects.toThrowError();
	});

	it("should fail to generate an output from a wif", async () => {
		await expect(subject.fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
	});
});