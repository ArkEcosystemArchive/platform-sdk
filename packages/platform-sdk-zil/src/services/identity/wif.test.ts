import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { WIF } from "./wif";

let subject: WIF;

beforeEach(async () => (subject = new WIF()));

describe("#wif", () => {
	it("should fail to generate an output from a mnemonic", async () => {
		await expect(subject.fromMnemonic(identity.mnemonic)).rejects.toThrow(/is not supported/);
	});
});
