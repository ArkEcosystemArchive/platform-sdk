import "jest-extended";

import { identity } from "../../../test/identity";
import { createConfig } from "../../../test/helpers";
import { WIF } from "./wif";

let subject: WIF;

beforeEach(async () => {
	subject = new WIF(createConfig());
});

describe("WIF", () => {
	describe("#fromMnemonic", () => {
		it("should generate an output from a mnemonic", async () => {
			await expect(subject.fromMnemonic(identity.mnemonic)).resolves.toBe(identity.wif);
		});
	});
});
