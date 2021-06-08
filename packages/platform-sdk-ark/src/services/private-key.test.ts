import { Exceptions } from "@arkecosystem/platform-sdk";
import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createService } from "../../test/helpers";
import { PrivateKeyService } from "./private-key";

let subject: PrivateKeyService;

beforeEach(async () => {
	subject = createService(PrivateKeyService);
});

describe("PrivateKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toEqual({ privateKey: "d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712" });
	});

	it("should fail to generate an output from an invalid mnemonic", async () => {
		await expect(subject.fromMnemonic(undefined!)).rejects.toThrow(Exceptions.CryptoException);
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.fromWIF(identity.wif);

		expect(result).toEqual({ privateKey: "d8839c2432bfd0a67ef10a804ba991eabba19f154a3d707917681d45822a5712" });
	});

	it("should fail to generate an output from an invalid wif", async () => {
		expect(subject.fromWIF(undefined!)).rejects.toThrow(Exceptions.CryptoException);
	});
});
