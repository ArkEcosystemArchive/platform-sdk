import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { Keys } from "./keys";

let subject: Keys;

beforeEach(async () => (subject = new Keys(createConfig())));

describe("Keys", () => {
	it("should generate an output from a mnemonic", async () => {
		await expect(subject.fromMnemonic(identity.mnemonic)).resolves.toEqual({
			publicKey: identity.publicKey,
			privateKey: identity.privateKey,
		});
	});

	it("should generate an output from a privateKey", async () => {
		await expect(subject.fromPrivateKey(identity.privateKey)).resolves.toEqual({
			publicKey: identity.publicKey,
			privateKey: identity.privateKey,
		});
	});

	it("should generate an output from a wif", async () => {
		await expect(subject.fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
	});
});
