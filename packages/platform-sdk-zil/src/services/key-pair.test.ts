import "jest-extended";

import { IoC } from "@arkecosystem/platform-sdk";

import { identity } from "../../test/fixtures/identity";
import { createService, mockWallet } from "../../test/helpers";
import { BindingType } from "../constants";
import { KeyPairService } from "./key-pair";

let subject: KeyPairService;

beforeEach(async () => {
	subject = createService(KeyPairService, undefined, (container: IoC.Container) => {
		container.constant(BindingType.Wallet, mockWallet());
	});
});

describe("Keys", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toEqual({
			privateKey: identity.privateKey,
			publicKey: identity.publicKey,
		});
	});

	it("should fail from an invalid mnemonic", async () => {
		await expect(subject.fromMnemonic(identity.mnemonic.slice(0, 10))).rejects.toThrowError();
	});

	it("should generate an output from a privateKey", async () => {
		const result = await subject.fromPrivateKey(identity.privateKey);

		expect(result).toEqual({
			privateKey: identity.privateKey,
			publicKey: identity.publicKey,
		});
	});

	it("should fail to generate an output from a wif", async () => {
		await expect(subject.fromWIF(identity.wif)).rejects.toThrow(/is not implemented/);
	});
});
