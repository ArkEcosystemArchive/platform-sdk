import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { PublicKeyService } from "./public-key";

let subject: PublicKeyService;

beforeEach(async () => (subject = new PublicKeyService(createConfig())));

describe("PublicKey", () => {
	it("should generate an output from a mnemonic", async () => {
		await expect(subject.fromMnemonic(identity.mnemonic)).resolves.toEqual({ publicKey: identity.publicKey });
	});

	it("should fail to generate an output from a multiSignature", async () => {
		await expect(subject.fromMultiSignature(0, [])).rejects.toThrow(/is not supported/);
	});

	it("should fail to generate an output from a wif", async () => {
		await expect(subject.fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
	});
});
