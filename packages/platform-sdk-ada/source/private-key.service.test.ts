import "jest-extended";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/helpers";
import { PrivateKeyService } from "./private-key.service";

let subject: PrivateKeyService;

beforeEach(async () => {
	subject = createService(PrivateKeyService);
});

describe("PrivateKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toEqual({ privateKey: identity.privateKey });
	});

	it("should fail to generate an output from an invalid mnemonic", async () => {
		await expect(subject.fromMnemonic(identity.mnemonic.slice(0, 10))).rejects.toThrowError();
	});
});
