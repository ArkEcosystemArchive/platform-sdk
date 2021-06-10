import "jest-extended";

import { IoC } from "@arkecosystem/platform-sdk";

import { identity } from "../test/fixtures/identity";
import { createService, mockWallet } from "../test/helpers";
import { BindingType } from "./constants";
import { AddressService } from "./address.service";

let subject: AddressService;

beforeEach(async () => {
	subject = createService(AddressService, undefined, (container: IoC.Container) => {
		container.constant(BindingType.Wallet, mockWallet());
	});
});

describe("Address", () => {
	it("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		expect(result).toEqual({ type: "bip44", address: identity.bech32Address });
	});

	it("should generate an output from a privateKey", async () => {
		const result = await subject.fromPrivateKey(identity.privateKey);

		expect(result).toEqual({ type: "bip44", address: identity.bech32Address });
	});

	it("should validate an address", async () => {
		await expect(subject.validate(identity.address)).resolves.toBeTrue();
		await expect(subject.validate(identity.bech32Address)).resolves.toBeTrue();
		await expect(subject.validate(identity.address.slice(0, 10))).resolves.toBeFalse();
	});
});
