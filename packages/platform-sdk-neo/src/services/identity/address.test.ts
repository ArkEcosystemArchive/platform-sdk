import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { IdentityService } from ".";

let subject: IdentityService;

beforeEach(async () => (subject = await IdentityService.__construct(createConfig())));

describe("Address", () => {
	it("should generate an output from a mnemonic", async () => {
		const result: any = await subject.address().fromMnemonic(identity.mnemonic);

		expect(result).toBe(identity.address);
	});

	it("should generate an output from a publicKey", async () => {
		const result: any = await subject.address().fromPublicKey(identity.publicKey);

		expect(result).toBe(identity.address);
	});

	it("should generate an output from a privateKey", async () => {
		const result: any = await subject.address().fromPrivateKey(identity.privateKey);

		expect(result).toBe(identity.address);
	});

	it("should generate an output from a wif", async () => {
		const result: any = await subject.address().fromWIF(identity.wif);

		expect(result).toBe(identity.address);
	});

	it("should validate an address", async () => {
		await expect(subject.address().validate("AdVSe37niA3uFUPgCgMUH2tMsHF4LpLoiX")).resolves.toBeTrue();
		await expect(subject.address().validate("ABC")).resolves.toBeFalse();
	});
});
