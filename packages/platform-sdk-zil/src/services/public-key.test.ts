import { IoC } from "@arkecosystem/platform-sdk";
import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createService, mockWallet } from "../../test/helpers";
import { BindingType } from "../constants";
import { PublicKeyService } from "./public-key";

let subject: PublicKeyService;

beforeEach(async () => {
	subject = createService(PublicKeyService, undefined, (container: IoC.Container) => {
		container.constant(BindingType.Wallet, mockWallet());
	});
});

describe("PublicKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toEqual({ publicKey: identity.publicKey });
	});

	it("should fail to generate an output from an invalid mnemonic", async () => {
		await expect(subject.fromMnemonic(identity.mnemonic.slice(0, 10))).rejects.toThrowError();
	});

	it("should fail to generate an output from a multiSignature", async () => {
		await expect(
			subject.fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys),
		).rejects.toThrow(/is not implemented/);
	});

	it("should fail to generate an output from a wif", async () => {
		await expect(subject.fromWIF(identity.wif)).rejects.toThrow(/is not implemented/);
	});
});
