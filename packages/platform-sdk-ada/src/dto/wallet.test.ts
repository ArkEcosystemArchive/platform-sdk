import "jest-extended";

import Fixture from "../../test/fixtures/client/wallet.json";
import { WalletData } from "./wallet";

describe("WalletData", () => {
	const subject = new WalletData(Fixture);

	it("#address", () => {
		expect(subject.address()).toEqual("98c83431e94407bc0889e09953461fe5cecfdf18");
	});

	it("#publicKey", () => {
		expect(() => subject.publicKey()).toThrow(/not implemented/);
	});

	it("#balance", () => {
		expect(subject.balance().available.toString()).toEqual("2000000000");
		expect(subject.balance().fees.toString()).toEqual("0");
	});

	it("#nonce", () => {
		expect(() => subject.nonce()).toThrow(/not implemented/);
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
