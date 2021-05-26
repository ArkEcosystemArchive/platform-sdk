import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { PublicKeyService } from "./public-key";

let subject: PublicKeyService;

beforeEach(async () => (subject = new PublicKeyService(createConfig())));

describe("PublicKey", () => {
	describe("#fromMnemonic", () => {
		it("should generate an output from a mnemonic", async () => {
			await expect(subject.fromMnemonic(identity.mnemonic)).resolves.toEqual({ publicKey: identity.publicKey });
		});
	});
});
