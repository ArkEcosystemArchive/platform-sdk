import "jest-extended";

import { IoC } from "@arkecosystem/platform-sdk";
import { cryptoWaitReady } from "@polkadot/util-crypto";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { BindingType } from "./constants";
import { createKeyring } from "./factories";
import { AddressService } from "./address.service";

let subject: AddressService;

beforeEach(async () => {
	await cryptoWaitReady();

	subject = createService(AddressService, undefined, async (container: IoC.Container) => {
		container.constant(BindingType.Keyring, createKeyring(container.get(IoC.BindingType.ConfigRepository)));
	});
});

describe("Address", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toEqual({ type: "ss58", address: identity.address });
	});

	it("should generate an output from a multiSignature", async () => {
		const result = await subject.fromMultiSignature(
			identity.multiSignature.min,
			identity.multiSignature.publicKeys,
		);

		expect(result).toEqual({ type: "ss58", address: identity.multiSignatureAddress });
	});

	it("should validate an address", async () => {
		await expect(subject.validate(identity.address)).resolves.toBeTrue();
		await expect(subject.validate(identity.address.slice(0, 10))).resolves.toBeFalse();
	});
});
