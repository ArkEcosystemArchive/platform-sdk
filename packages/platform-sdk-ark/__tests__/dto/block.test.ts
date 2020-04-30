import "jest-extended";
import { BigNumber } from "@arkecosystem/utils";

import { BlockData } from "../../src/dto";
import Fixture from "../__fixtures__/client/getBlock.json";

let subject: BlockData;

beforeEach(() => (subject = new BlockData(Fixture.data)));

describe("BlockData", function () {
	test("#getId", () => {
		expect(subject.getId()).toBe("13114381566690093367");
	});

	test("#getHeight", () => {
		expect(subject.getHeight()).toBe(1);
	});

	test("#getTimestamp", () => {
		expect(subject.getTimestamp()).toBe(0);
	});

	test("#getConfirmations", () => {
		expect(subject.getConfirmations()).toEqual(BigNumber.make(4636114));
	});

	test("#getTransactionsCount", () => {
		expect(subject.getTransactionsCount()).toBe(52);
	});

	test("#getGenerator", () => {
		expect(subject.getGenerator()).toBe("03d3fdad9c5b25bf8880e6b519eb3611a5c0b31adebc8455f0e096175b28321aff");
	});

	test("#getForgedReward", () => {
		expect(subject.getForgedReward()).toEqual(BigNumber.make(0));
	});

	test("#getForgedAmount", () => {
		expect(subject.getForgedAmount()).toEqual(BigNumber.make("12500000000000000"));
	});

	test("#getForgedFee", () => {
		expect(subject.getForgedFee()).toEqual(BigNumber.make(0));
	});

	test("#getForgedTotal", () => {
		expect(subject.getForgedTotal()).toEqual(BigNumber.make(0));
	});

	test("#toObject", () => {
		expect(subject.toObject()).toBeObject();
	});

	test("#raw", () => {
		expect(subject.raw()).toEqual(Fixture.data);
	});
});
