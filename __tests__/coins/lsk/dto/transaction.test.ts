import { BigNumber } from "@arkecosystem/utils";

import { Transaction } from "../../../../src/coins/lsk/dto";
import Fixture from "../__fixtures__/client/getTransaction.json";

let subject: Transaction;

beforeEach(() => (subject = new Transaction(Fixture.data[0])));

describe("Lisk", function () {
	test("#getId", () => {
		expect(subject.getId()).toBe("15210966682544220710");
	});

	test("#getType", () => {
		expect(subject.getType()).toBe(8);
	});

	test("#getTypeGroup", () => {
		expect(subject.getTypeGroup()).toBeUndefined();
	});

	test("#getTimestamp", () => {
		expect(subject.getTimestamp()).toBe(121185994);
	});

	test("#getConfirmations", () => {
		expect(subject.getConfirmations()).toEqual(BigNumber.make(35754));
	});

	test("#getNonce", () => {
		expect(subject.getNonce()).toBeUndefined();
	});

	test("#getSender", () => {
		expect(subject.getSender()).toBe("1a3aec07d0ff815c910d4c707a66b58a692dacb3de9d7d95a085bcee93738a07");
	});

	test("#getRecipient", () => {
		expect(subject.getRecipient()).toBe("18218254863282357638L");
	});

	test("#getAmount", () => {
		expect(subject.getAmount()).toEqual(BigNumber.make("1"));
	});

	test("#getFee", () => {
		expect(subject.getFee()).toEqual(BigNumber.make("10000000"));
	});

	test("#getVendorField", () => {
		expect(subject.getVendorField()).toBe("Account initialization");
	});

	test("#getBlockId", () => {
		expect(subject.getBlockId()).toBe("6722847676494099642");
	});
});
