import { BigNumber } from "@arkecosystem/utils";

import { TransactionData } from "../../src/dto";
import Fixture from "../__fixtures__/client/getTransaction.json";

let subject: TransactionData;

beforeEach(() => (subject = new TransactionData(Fixture.data)));

describe("TransactionData", function () {
	test("#getId", () => {
		expect(subject.getId()).toBe("3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572");
	});

	test("#getType", () => {
		expect(subject.getType()).toBe(0);
	});

	test("#getTypeGroup", () => {
		expect(subject.getTypeGroup()).toBe(1);
	});

	test("#getTimestamp", () => {
		expect(subject.getTimestamp()).toBe(0);
	});

	test("#getConfirmations", () => {
		expect(subject.getConfirmations()).toEqual(BigNumber.make(4636121));
	});

	test("#getNonce", () => {
		expect(subject.getNonce()).toBe("1");
	});

	test("#getSender", () => {
		expect(subject.getSender()).toBe("0208e6835a8f020cfad439c059b89addc1ce21f8cab0af6e6957e22d3720bff8a4");
	});

	test("#getRecipient", () => {
		expect(subject.getRecipient()).toBe("D6Z26L69gdk9qYmTv5uzk3uGepigtHY4ax");
	});

	test("#getAmount", () => {
		expect(subject.getAmount()).toEqual(BigNumber.make("12500000000000000"));
	});

	test("#getFee", () => {
		expect(subject.getFee()).toEqual(BigNumber.ZERO);
	});

	test("#getVendorField", () => {
		expect(subject.getVendorField()).toBeUndefined();
	});

	test("#getBlockId", () => {
		expect(subject.getBlockId()).toBe("13114381566690093367");
	});

	test("#toObject", () => {
		expect(subject.toObject()).toEqual(Fixture.data);
	});
});
