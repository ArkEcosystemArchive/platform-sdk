import { Exceptions } from "@arkecosystem/platform-sdk";
import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { createNetworkConfig } from "../../../test/helpers";
import { KeyPairService } from "./keys";

let subject: KeyPairService;

beforeEach(async () => (subject = new KeyPairService(createNetworkConfig())));

describe("Keys", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toEqual({
			privateKey: "d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712",
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		});
	});

	it("should fail to generate an output from an invalid mnemonic", async () => {
		expect(subject.fromMnemonic(undefined!)).rejects.toThrow(Exceptions.CryptoException);
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.fromWIF(identity.wif);

		expect(result).toEqual({
			privateKey: "d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712",
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		});
	});

	it("should fail to generate an output from an invalid wif", async () => {
		expect(subject.fromWIF(undefined!)).rejects.toThrow(Exceptions.CryptoException);
	});
});
