import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfigWithNetwork } from "../../../test/helpers";
import { PrivateKey } from "./private-key";
import { IdentityService } from ".";

let subject: PrivateKey;

beforeEach(async () => (subject = (await IdentityService.__construct(createConfigWithNetwork())).privateKey()));

describe("PrivateKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toBe("d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712");
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.fromWIF(identity.wif);

		expect(result).toBe("d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712");
	});
});
