import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { PublicKeyService } from "./public-key";

let subject: PublicKeyService;

beforeEach(async () => (subject = new PublicKeyService(createConfig())));

describe("PublicKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toEqual({ publicKey: identity.publicKey });
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.fromWIF(identity.wif);

		expect(result).toEqual({ publicKey: identity.publicKey });
	});
});
