import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { Keys } from "./keys";

let subject: Keys;

beforeEach(async () => (subject = new Keys(createConfig())));

describe("Keys", () => {
	it("should generate an output from a secret", async () => {
		const result = await subject.fromSecret(identity.mnemonic);

		expect(result).toEqual({
			privateKey: identity.privateKey,
			publicKey: identity.publicKey,
		});
	});
});
