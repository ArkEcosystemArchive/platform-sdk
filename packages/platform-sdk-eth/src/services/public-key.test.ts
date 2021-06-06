import { IoC } from "@arkecosystem/platform-sdk";
import "jest-extended";

import { identity } from "../../test/fixtures/identity";
import { createService } from "../../test/helpers";
import { PublicKeyService } from "./public-key";
import { PrivateKeyService } from "./private-key";

let subject: PublicKeyService;

beforeEach(async () => {
	subject = createService(PublicKeyService, undefined, (container: IoC.Container) => {
		container.singleton(IoC.BindingType.PrivateKeyService, PrivateKeyService);
	});
});

describe("PublicKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toEqual({ publicKey: identity.publicKey });
	});

	it("should generate an output from a multiSignature", async () => {
		await expect(
			subject.fromMultiSignature(identity.multiSignature.min, identity.multiSignature.publicKeys),
		).rejects.toThrow(/is not implemented/);
	});

	it("should generate an output from a wif", async () => {
		await expect(subject.fromWIF(identity.wif)).rejects.toThrow(/is not implemented/);
	});
});
