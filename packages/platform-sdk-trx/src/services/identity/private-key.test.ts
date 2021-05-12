import "jest-extended";

import { identity } from "../../../test/identity";
import { createConfig } from "../../../test/helpers";
import { PrivateKey } from "./private-key";

let subject: PrivateKey;

beforeEach(async () => {
	subject = new PrivateKey(createConfig());
});

describe("PrivateKey", () => {
	describe("#fromMnemonic", () => {
		it("should generate an output from a mnemonic", async () => {
			await expect(subject.fromMnemonic(identity.mnemonic)).resolves.toBe(identity.privateKey);
		});
	});
});
