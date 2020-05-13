import "jest-extended";
import { Utils } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../../src/dto";
import Fixture from "../__fixtures__/client/transaction.json";

let subject: TransactionData;

beforeEach(() => (subject = new TransactionData(Fixture.data)));

describe("TransactionData", function () {
	test("#id", () => {
		expect(subject.id()).toBe("3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572");
	});

	test("#type", () => {
		expect(subject.type()).toBe("transfer");
	});

	test("#timestamp", () => {
		expect(subject.timestamp()).toBe(0);
	});

	test("#confirmations", () => {
		expect(subject.confirmations()).toEqual(Utils.BigNumber.make(4636121));
	});

	test("#nonce", () => {
		expect(subject.nonce()).toEqual(Utils.BigNumber.make(1));
	});

	test("#sender", () => {
		expect(subject.sender()).toBe("0208e6835a8f020cfad439c059b89addc1ce21f8cab0af6e6957e22d3720bff8a4");
	});

	test("#recipient", () => {
		expect(subject.recipient()).toBe("D6Z26L69gdk9qYmTv5uzk3uGepigtHY4ax");
	});

	test("#amount", () => {
		expect(subject.amount()).toEqual(Utils.BigNumber.make("12500000000000000"));
	});

	test("#fee", () => {
		expect(subject.fee()).toEqual(Utils.BigNumber.ZERO);
	});

	test("#memo", () => {
		expect(subject.memo()).toBeUndefined();
	});

	test("#toObject", () => {
		expect(subject.toObject()).toBeObject();
	});

	test("#raw", () => {
		expect(subject.raw()).toEqual(Fixture.data);
	});
});
