import "jest-extended";

import { identity } from "../../../test/identity";
import { createConfig } from "../../../test/helpers";
import { Keys } from "./keys";

let subject: Keys;

beforeEach(async () => {
	subject = new Keys(createConfig());
});

describe("Keys", () => {
	describe("#fromMnemonic", () => {
		it("should generate an output from a mnemonic", async () => {
			await expect(subject.fromMnemonic(identity.mnemonic)).resolves.toBe({
				publicKey: identity.publicKey,
				privateKey: identity.privateKey,
			});
		});
	});
});
