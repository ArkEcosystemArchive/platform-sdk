import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { PrivateKeyService } from "./private-key";

let subject: PrivateKeyService;

beforeEach(async () => (subject = new PrivateKeyService(createConfig())));

describe("PrivateKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toEqual({ privateKey: identity.privateKey });
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.fromWIF(identity.wif);

		expect(result).toEqual({ privateKey: identity.privateKey });
	});
});
