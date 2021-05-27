import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { PrivateKeyService } from "./private-key";

let subject: PrivateKeyService;

beforeEach(async () => (subject = new PrivateKeyService(createConfig())));

describe("PrivateKey", () => {
	it("should generate an output from a mnemonic", async () => {
		await expect(subject.fromMnemonic(identity.mnemonic)).resolves.toEqual({ privateKey: identity.privateKey });
	});

	it("should fail to generate an output from a wif", async () => {
		await expect(subject.fromWIF(identity.wif)).rejects.toThrow(/is not supported/);
	});
});
