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
		  "address": "cosmos1fvxjdyfdvat5g0ee7jmyemwl2n95ad7negf7ap",
		  "path": "m/44'/118'/0'/0/0",
		  "type": "bip44",
		}
	`);
	});
});
