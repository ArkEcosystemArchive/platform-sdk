import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { Keys } from "./keys";

let subject: Keys;

beforeEach(async () => (subject = new Keys(createConfig())));

describe("Keys", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toEqual({
			privateKey: identity.privateKey,
			publicKey: identity.publicKey,
		});
	});

	it("should generate an output from a privateKey", async () => {
		const result = await subject.fromPrivateKey(identity.privateKey);

		expect(result).toEqual({
			privateKey: identity.privateKey,
			publicKey: identity.publicKey,
		});
	});

	it("should generate an output from a wif", async () => {
		await expect(subject.fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
	});
});
