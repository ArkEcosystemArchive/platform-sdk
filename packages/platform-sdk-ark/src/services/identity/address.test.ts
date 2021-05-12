import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfigWithNetwork } from "../../../test/helpers";
import { IdentityService } from ".";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfigWithNetwork())));

describe("#address", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.address().fromMnemonic(identity.mnemonic);

		expect(result).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	});

	it("should generate an output from a multiSignature", async () => {
		const result = await subject
			.address()
			.fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys);

		expect(result).toBe("DMS861mLRrtH47QUMVif3C2rBCAdHbmwsi");
	});

	it("should generate an output from a publicKey", async () => {
		const result = await subject.address().fromPublicKey(identity.publicKey);

		expect(result).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	});

	it("should generate an output from a privateKey", async () => {
		const result = await subject.address().fromPrivateKey(identity.privateKey);

		expect(result).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.address().fromWIF(identity.wif);

		expect(result).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	});

	it("should validate an address", async () => {
		await expect(subject.address().validate(identity.address)).resolves.toBeTrue();
		await expect(subject.address().validate("AdVSe37niA3uFUPgCgMUH2tMsHF4LpLoiX")).resolves.toBeFalse();
		await expect(subject.address().validate("ABC")).resolves.toBeFalse();
	});
});