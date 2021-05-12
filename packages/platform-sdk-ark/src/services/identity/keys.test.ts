import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfigWithNetwork } from "../../../test/helpers";
import { IdentityService } from ".";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfigWithNetwork())));

describe("#keys", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.keys().fromMnemonic(identity.mnemonic);

		expect(result).toEqual({
			privateKey: "d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712",
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		});
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.keys().fromWIF(identity.wif);

		expect(result).toEqual({
			privateKey: "d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712",
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		});
	});
});
