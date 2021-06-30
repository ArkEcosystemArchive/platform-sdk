import "jest-extended";

import { Exceptions } from "@arkecosystem/platform-sdk";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { WIFService } from "./wif.service";

let subject: WIFService;

beforeEach(async () => {
	subject = createService(WIFService);
});

describe("WIF", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toEqual({ wif: identity.wif });
	});

	it("should fail to generate an output from an invalid mnemonic", async () => {
		await expect(subject.fromMnemonic(undefined!)).rejects.toThrow(Exceptions.CryptoException);
	});

	it("should generate an output from a private key", async () => {
		const result = await subject.fromPrivateKey(identity.privateKey);

		expect(result).toEqual({ wif: identity.wif });
	});

	it("should fail to generate an output from an invalid private key", async () => {
		await expect(subject.fromPrivateKey(undefined!)).rejects.toThrow(Exceptions.CryptoException);
	});
});
