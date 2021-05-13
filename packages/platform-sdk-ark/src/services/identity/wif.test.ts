import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfigWithNetwork } from "../../../test/helpers";
import { IdentityService } from ".";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfigWithNetwork())));

describe("#wif", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.wif().fromMnemonic(identity.mnemonic);

		expect(result).toBe("SGq4xLgZKCGxs7bjmwnBrWcT4C1ADFEermj846KC97FSv1WFD1dA");
	});
});
