import "jest-extended";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/helpers";
import { KeyPairService } from "./key-pair.service";

let subject: KeyPairService;

beforeEach(async () => {
	subject = createService(KeyPairService);
});

describe("Keys", () => {
	it("should generate an output from a secret", async () => {
		const result = await subject.fromSecret(identity.mnemonic);

		expect(result).toEqual({
			privateKey: identity.privateKey,
			publicKey: identity.publicKey,
		});
	});
});
