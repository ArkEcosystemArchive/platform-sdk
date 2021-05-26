import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { WIFService } from "./wif";

let subject: WIFService;

beforeEach(async () => (subject = new WIFService(createConfig())));

describe("WIF", () => {
	describe("#fromMnemonic", () => {
		it("should generate an output from a mnemonic", async () => {
			await expect(subject.fromMnemonic(identity.mnemonic)).resolves.toEqual({ wif: identity.wif });
		});
	});
});
