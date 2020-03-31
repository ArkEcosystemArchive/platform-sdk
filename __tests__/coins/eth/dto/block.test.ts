import { BigNumber } from "@arkecosystem/utils";

import { Block } from "../../../../src/coins/eth/dto";
import Fixture from "../__fixtures__/client/getBlock.json";

let subject: Block;

beforeEach(() => (subject = new Block(Fixture.result)));

describe("Ethereum", function () {
	test("#getId", () => {
		expect(subject.getId()).toBe("0xce3ffbdd8335692c7ffa5d162ad24acb25ea9a0fdd4df65706b18c8ecb4059b4");
	});

	test("#getHeight", () => {
		expect(subject.getHeight()).toBe(7623263);
	});

	test("#getTimestamp", () => {
		expect(subject.getTimestamp()).toBe(1585624384);
	});

	test("#getConfirmations", () => {
		expect(subject.getConfirmations()).toEqual(BigNumber.make(0));
	});

	test("#getTransactionsCount", () => {
		expect(subject.getTransactionsCount()).toBe(168);
	});

	test("#getGenerator", () => {
		expect(subject.getGenerator()).toBe("0x05FC5a079e0583B8A07526023A16E2022c4C6296");
	});

	test("#getForgedReward", () => {
		expect(subject.getForgedReward()).toEqual(BigNumber.make("0"));
	});

	test("#getForgedAmount", () => {
		expect(subject.getForgedAmount()).toEqual(BigNumber.make("15001837000000000079"));
	});

	test("#getForgedFee", () => {
		expect(subject.getForgedFee()).toEqual(BigNumber.make("7407061"));
	});

	test("#getForgedTotal", () => {
		expect(subject.getForgedTotal()).toEqual(BigNumber.make("15001837000007407140"));
	});

	test("#toObject", () => {
		expect(subject.toObject()).toEqual(Fixture.result);
	});
});
