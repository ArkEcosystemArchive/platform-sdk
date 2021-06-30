import "jest-extended";

import { Exceptions } from "@arkecosystem/platform-sdk";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { PrivateKeyService } from "./private-key.service";

let subject: PrivateKeyService;

beforeEach(async () => {
	subject = createService(PrivateKeyService);
});

describe("PrivateKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toEqual({ privateKey: identity.privateKey });
	});

	it("should fail to generate an output from an invalid mnemonic", async () => {
		await expect(subject.fromMnemonic(undefined!)).rejects.toThrow(Exceptions.CryptoException);
	});

	it("should generate an output from a wif", async () => {
		const result = await subject.fromWIF(identity.wif);

		expect(result).toEqual({ privateKey: identity.privateKey });
	});

	it("should fail to generate an output from an invalid wif", async () => {
		await expect(subject.fromWIF(undefined!)).rejects.toThrow(Exceptions.CryptoException);
	});
});
