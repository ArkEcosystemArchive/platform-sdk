import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { PublicKey } from "./public-key";

let subject: PublicKey;

beforeEach(async () => (subject = new PublicKey(createConfig())));

describe("PublicKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result: any = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toBe(identity.publicKey);
	});

	it("should generate an output from a wif", async () => {
		const result: any = await subject.fromWIF(identity.wif);

		expect(result).toBe(identity.publicKey);
	});
});
