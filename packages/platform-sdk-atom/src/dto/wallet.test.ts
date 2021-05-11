import "jest-extended";

import { BigNumber } from "@arkecosystem/platform-sdk-support";

import Fixture from "../../test/fixtures/client/wallet.json";
import { WalletData } from "./wallet";

describe("WalletData", function () {
	const subject = new WalletData({
		address: Fixture.result.value.address,
		publicKey: Fixture.result.value.public_key.value,
		balance: 22019458509,
		sequence: Fixture.result.value.sequence,
	});

	it("#address", () => {
		expect(subject.address()).toEqual("cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0");
	});

	it("#publicKey", () => {
		expect(subject.publicKey()).toEqual("Ap65s+Jdgo8BtvTbkc7GyUti8yJ7RpZ7cE1zCuKgNeXY");
	});

	it("#balance", () => {
		expect(subject.balance()).toEqual(BigNumber.make(22019458509));
	});

	it("#entities", () => {
		expect(subject.entities()).toHaveLength(0);
	});

	it("#nonce", () => {
		expect(subject.nonce()).toEqual(BigNumber.make(24242));
	});

	it("#secondPublicKey", () => {
		expect(subject.secondPublicKey()).toBeUndefined();
	});

	it("#username", () => {
		expect(subject.username()).toBeUndefined();
	});

	it("#rank", () => {
		expect(subject.rank()).toBeUndefined();
	});

	it("#votes", () => {
		expect(subject.votes()).toBeUndefined();
	});

	it("#multiSignature", () => {
		expect(() => subject.multiSignature()).toThrow(/not implemented/);
	});

	it("#isMultiSignature", () => {
		expect(subject.isMultiSignature()).toBeFalse();
	});

	it("#isDelegate", () => {
		expect(subject.isDelegate()).toBeFalse();
	});

	it("#isSecondSignature", () => {
		expect(subject.isSecondSignature()).toBeFalse();
	});

	it("#isResignedDelegate", () => {
		expect(subject.isResignedDelegate()).toBeFalse();
	});
});
