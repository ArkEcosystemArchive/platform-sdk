import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfigWithNetwork } from "../../../test/helpers";
import { IdentityService } from ".";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfigWithNetwork())));

describe("PublicKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.publicKey().fromMnemonic(identity.mnemonic);

		expect(result).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
	});

	it("should generate an output from a multiSignature", async () => {
		const result = await subject
			.publicKey()
			.fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys);

		expect(result).toBe("0279f05076556da7173610a7676399c3620276ebbf8c67552ad3b1f26ec7627794");
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.publicKey().fromWIF(identity.wif);

		expect(result).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
	});
});
