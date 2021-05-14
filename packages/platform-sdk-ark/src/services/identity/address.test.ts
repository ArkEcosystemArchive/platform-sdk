import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfigWithNetwork } from "../../../test/helpers";
import { Address } from "./address";
import { IdentityService } from ".";

let subject: Address;

beforeEach(async () => (subject = (await IdentityService.__construct(createConfigWithNetwork())).address()));

describe("Address", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	});

	it("should generate an output from a multiSignature", async () => {
		const result = await subject.fromMultiSignature(
			identity.multiSignature.min,
			identity.multiSignature.publicKeys,
		);

		expect(result).toBe("DMS861mLRrtH47QUMVif3C2rBCAdHbmwsi");
	});

	it("should generate an output from a publicKey", async () => {
		const result = await subject.fromPublicKey(identity.publicKey);

		expect(result).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	});

	it("should generate an output from a privateKey", async () => {
		const result = await subject.fromPrivateKey(identity.privateKey);

		expect(result).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.fromWIF(identity.wif);

		expect(result).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
	});

	it("should validate an address", async () => {
		await expect(subject.validate(identity.address)).resolves.toBeTrue();
		await expect(subject.validate("AdVSe37niA3uFUPgCgMUH2tMsHF4LpLoiX")).resolves.toBeFalse();
		await expect(subject.validate("ABC")).resolves.toBeFalse();
	});
});
