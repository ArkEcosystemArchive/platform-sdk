import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { WIFService } from "./wif";

let subject: WIFService;

beforeEach(async () => {
	subject = createService(WIFService);
});

describe("WIF", () => {
	it("should fail to generate an output from a mnemonic", async () => {
		await expect(subject.fromMnemonic(identity.mnemonic)).rejects.toThrow(/is not implemented/);
	});
});
