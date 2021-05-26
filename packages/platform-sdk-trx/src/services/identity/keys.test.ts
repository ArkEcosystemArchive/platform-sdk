import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { KeyPairService } from "./keys";

let subject: KeyPairService;

beforeEach(async () => (subject = new KeyPairService(createConfig())));

describe("Keys", () => {
	describe("#fromMnemonic", () => {
		it("should generate an output from a mnemonic", async () => {
			await expect(subject.fromMnemonic(identity.mnemonic)).resolves.toEqual({
				publicKey: identity.publicKey,
				privateKey: identity.privateKey,
			});
		});
	});
});
