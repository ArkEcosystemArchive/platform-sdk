import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createConfig } from "../../../test/helpers";
import { Address } from "./address";

let subject: Address;

beforeEach(async () => (subject = new Address(createConfig())));

describe("Address", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toBe(identity.address);
	});

	it("should generate an output from a publicKey", async () => {
		const result = await subject.fromPublicKey(identity.publicKey);

		expect(result).toBe(identity.address);
	});

	it("should generate an output from a privateKey", async () => {
		const result = await subject.fromPrivateKey(identity.privateKey);

		expect(result).toBe(identity.address);
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.fromWIF(identity.wif);

		expect(result).toBe(identity.address);
	});

	it("should validate an address", async () => {
		await expect(subject.validate("AdVSe37niA3uFUPgCgMUH2tMsHF4LpLoiX")).resolves.toBeTrue();
		await expect(subject.validate("ABC")).resolves.toBeFalse();
	});
});
