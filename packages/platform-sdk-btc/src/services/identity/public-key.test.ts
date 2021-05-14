import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { PublicKey } from "./public-key";

let subject: PublicKey;

beforeEach(async () => (subject = new PublicKey()));

describe("PublicKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toBe(identity.publicKey);
	});

	it("should generate an output from a multiSignature", async () => {
		await expect(
			subject.fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys),
		).rejects.toThrow(/is not supported/);
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.fromWIF(identity.wif);

		expect(result).toBe(identity.publicKey);
	});
});
