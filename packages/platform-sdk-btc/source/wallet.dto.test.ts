import "jest-extended";

import { BigNumber } from "@arkecosystem/platform-sdk-support";

import Fixture from "../test/fixtures/client/wallet.json";
import { WalletData } from "./wallet.dto";

describe("WalletData", () => {
	const subject = new WalletData(Fixture);

	it("#address", () => {
		expect(subject.address()).toEqual("my48EN4kDnGEpRZMBfiDS65wdfwfgCGZRz");
	});

	it("#publicKey", () => {
		expect(subject.publicKey()).toEqual("76a914c05f53de525d80151e209a729cf1c7909c88f88e88ac");
	});

	it("#balance", () => {
		expect(subject.balance().available).toEqual(BigNumber.make(3050000));
	});

	it("#nonce", () => {
		expect(subject.nonce()).toEqual(BigNumber.make(24242));
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

	it("#isMultiSignatureRegistration", () => {
		expect(subject.isMultiSignatureRegistration()).toBeFalse();
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
