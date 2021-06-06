import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { WIFService } from "./wif";

let subject: WIFService;

beforeEach(async () => (subject = new WIFService(createConfig())));

describe("WIF", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toEqual({ wif: identity.wif });
	});
});
