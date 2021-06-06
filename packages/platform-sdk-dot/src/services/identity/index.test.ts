import "jest-extended";

import { createService } from "../../test/helpers";
import { IdentityService } from ".";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfig())));

it("should do nothing on destruct", async () => {
	await expect(subject.__destruct()).resolves.toBeUndefined();
});
