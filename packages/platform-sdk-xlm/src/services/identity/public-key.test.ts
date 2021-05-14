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
});
