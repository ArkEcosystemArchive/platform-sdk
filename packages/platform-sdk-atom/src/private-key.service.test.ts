import "jest-extended";

import { IoC } from "@arkecosystem/platform-sdk";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/helpers";
import { KeyPairService } from "./key-pair.service";
import { PrivateKeyService } from "./private-key.service";

let subject: PrivateKeyService;

beforeEach(async () => {
	subject = createService(PrivateKeyService, undefined, (container: IoC.Container) => {
		container.singleton(IoC.BindingType.KeyPairService, KeyPairService);
	});
});

describe("PrivateKey", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toEqual({ privateKey: identity.privateKey });
	});
});
