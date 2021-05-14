import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { WIF } from "./wif";

let subject: WIF;

beforeEach(async () => (subject = new WIF()));

describe("WIF", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toBe(identity.wif);
	});
});
