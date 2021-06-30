import "jest-extended";

import { IoC } from "@arkecosystem/platform-sdk";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { AddressService } from "./address.service";
import { KeyPairService } from "./key-pair.service";

let subject: AddressService;

beforeEach(async () => {
	subject = createService(AddressService, undefined, (container: IoC.Container) => {
		container.singleton(IoC.BindingType.KeyPairService, KeyPairService);
	});
});

describe("Address", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "address": "cosmos1wqus3z856rwadvum3l0lg0nl4sc957vq0wn8d0",
		  "path": "m/44'/118'/0'/0/0",
		  "type": "bip44",
		}
	`);
	});
});
