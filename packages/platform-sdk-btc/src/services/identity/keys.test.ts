import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { Keys } from "./keys";

let subject: Keys;

beforeEach(async () => (subject = new Keys()));

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
		const result = await subject.fromWIF(identity.wif);

		expect(result).toEqual({
			privateKey: identity.privateKey,
			publicKey: identity.publicKey,
		});
	});
});
