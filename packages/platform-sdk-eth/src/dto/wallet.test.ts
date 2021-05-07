import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { WalletData } from "./wallet";

let subject: WalletData;

beforeEach(
	() =>
		(subject = new WalletData({
			address: "0x4581a610f96878266008993475f1476ca9997081",
			balance: 10,
			nonce: 0,
		})),
);

describe("WalletData", function () {
	it("#address", () => {
		expect(subject.address()).toEqual("0x4581a610f96878266008993475f1476ca9997081");
	});

	it("#publicKey", () => {
		expect(subject.publicKey()).toBeUndefined();
	});

	it("#balance", () => {
		expect(subject.balance()).toEqual(BigNumber.make("10"));
	});

	it("#entities", () => {
		expect(subject.entities()).toHaveLength(0);
	});

	it("#nonce", () => {
		expect(subject.nonce()).toEqual(BigNumber.ZERO);
	});

	it("#secondPublicKey", () => {
		expect(() => subject.secondPublicKey()).toThrow(/not implemented/);
	});

	it("#username", () => {
		expect(() => subject.username()).toThrow(/not implemented/);
	});

	it("#rank", () => {
		expect(() => subject.rank()).toThrow(/not implemented/);
	});

	it("#votes", () => {
		expect(() => subject.votes()).toThrow(/not implemented/);
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
