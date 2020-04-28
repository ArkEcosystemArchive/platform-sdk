import { BigNumber } from "@arkecosystem/utils";

import { Transaction } from "../../src/dto";
import Fixture from "../__fixtures__/client/getTransaction.json";

let subject: Transaction;

beforeEach(() => (subject = new Transaction(Fixture.result)));

describe("Ethereum", function () {
	test("#getId", () => {
		expect(subject.getId()).toBe("0x35a28a5b1785d3729afc809851466fcc9971d09922196a1ca6d155756c222435");
	});

	test("#getType", () => {
		expect(subject.getType()).toBeUndefined();
	});

	test("#getTypeGroup", () => {
		expect(subject.getTypeGroup()).toBeUndefined();
	});

	test("#getTimestamp", () => {
		expect(subject.getTimestamp()).toBeUndefined();
	});

	test("#getConfirmations", () => {
		expect(subject.getConfirmations()).toEqual(BigNumber.ZERO);
	});

	test("#getNonce", () => {
		expect(subject.getNonce()).toBe(0);
	});

	test("#getSender", () => {
		expect(subject.getSender()).toBe("0x4581A610f96878266008993475F1476cA9997081");
	});

	test("#getRecipient", () => {
		expect(subject.getRecipient()).toBe("0x230b2A8C0CcE28fd6eFF491c47aeBa244b10A12c");
	});

	test("#getAmount", () => {
		expect(subject.getAmount()).toEqual(BigNumber.make("79000000000000"));
	});

	test("#getFee", () => {
		expect(subject.getFee()).toEqual(BigNumber.make("21000"));
	});

	test("#getVendorField", () => {
		expect(subject.getVendorField()).toBeUndefined();
	});

	test("#getBlockId", () => {
		expect(subject.getBlockId()).toBe(7623266);
	});

	test("#toObject", () => {
		expect(subject.toObject()).toEqual(Fixture.result);
	});
});
