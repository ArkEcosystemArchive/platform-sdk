import { Exceptions } from "@arkecosystem/platform-sdk";
import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createService } from "../../test/helpers";
import { WIFService } from "./wif";

let subject: WIFService;

beforeEach(async () => {
	subject = createService(WIFService);
});

describe("WIF", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toEqual({ wif: "SGq4xLgZKCGxs7bjmwnBrWcT4C1ADFEermj846KC97FSv1WFD1dA" });
	});

	it("should fail to generate an output from an invalid mnemonic", async () => {
		expect(subject.fromMnemonic(undefined!)).rejects.toThrow(Exceptions.CryptoException);
	});

	it("should generate an output from a private key", async () => {
		const result = await subject.fromPrivateKey(identity.privateKey);

		expect(result).toEqual({ wif: "SGq4xLgZKCGxs7bjmwnBrWcT4C1ADFEermj846KC97FSv1WFD1dA" });
	})

	it("should fail to generate an output from an invalid private key", async () => {
		await expect(subject.fromPrivateKey(undefined!)).rejects.toThrow(Exceptions.CryptoException);
	});
});
