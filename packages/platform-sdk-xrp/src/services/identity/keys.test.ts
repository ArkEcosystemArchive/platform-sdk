import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { KeyPairService } from "./key-pair";

let subject: KeyPairService;

beforeEach(async () => (subject = new KeyPairService(createConfig())));

describe("Keys", () => {
	it("should generate an output from a secret", async () => {
		const result = await subject.fromSecret(identity.mnemonic);

		expect(result).toEqual({
			privateKey: identity.privateKey,
			publicKey: identity.publicKey,
		});
	});
});
