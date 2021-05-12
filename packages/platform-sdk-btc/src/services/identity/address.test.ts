import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { IdentityService } from ".";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfig())));

describe("#address", () => {
	it("should generate an output from a mnemonic (BIP44)", async () => {
		const result = await subject.address().fromMnemonic(identity.mnemonic, { bip44: { account: 0 } });

		expect(result).toBe(identity.addressBIP44);
	});

	it("should generate an output from a mnemonic (BIP49)", async () => {
		const result = await subject.address().fromMnemonic(identity.mnemonic, { bip49: { account: 0 } });

		expect(result).toBe(identity.addressBIP49);
	});

	it("should generate an output from a mnemonic (BIP84)", async () => {
		const result = await subject.address().fromMnemonic(identity.mnemonic, { bip84: { account: 0 } });

		expect(result).toBe(identity.addressBIP84);
	});

	it("should generate an output from a multiSignature", async () => {
		const result = await subject
			.address()
			.fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys);

		expect(result).toBe("36NUkt6FWUi3LAWBqWRdDmdTWbt91Yvfu7");
	});

	it("should generate an output from a publicKey", async () => {
		const result = await subject.address().fromPublicKey(identity.publicKey);

		expect(result).toBe(identity.address);
	});

	it("should generate an output from a privateKey", async () => {
		const result = await subject.address().fromPrivateKey(identity.privateKey);

		expect(result).toBe(identity.address);
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.address().fromWIF(identity.wif);

		expect(result).toBe(identity.address);
	});
});