import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createService } from "../../test/helpers";
import { WIFService } from "./wif";

let subject: WIFService;

beforeEach(async () => (subject = new WIFService(createConfig())));

describe("WIF", () => {
	describe("#fromMnemonic", () => {
		it("should generate an output from a mnemonic", async () => {
			await expect(subject.fromMnemonic(identity.mnemonic)).resolves.toMatchInlineSnapshot(`
						Object {
						  "path": "m/44'/195'/0'/0/0",
						  "wif": "L2M8fs13JtFto4VZVN9fh3vVB2bFmEs3ykJmwuxTSpkA7yTCSUf8",
						}
					`);
		});
	});
});
