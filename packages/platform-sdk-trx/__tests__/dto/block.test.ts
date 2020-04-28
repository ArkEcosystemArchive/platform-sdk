import { BigNumber } from "@arkecosystem/utils";

import { Block } from "../../src/dto";
import Fixture from "../__fixtures__/client/getBlock.json";

let subject: Block;

beforeEach(() => (subject = new Block(Fixture)));

describe("Tron", function () {
	test("#getId", () => {
		expect(subject.getId()).toBe("000000000000303987c7c8ab3f5967c107a619fa47819940597e9938811a1764");
	});

	test("#getHeight", () => {
		expect(subject.getHeight()).toBe(12345);
	});

	test("#getTimestamp", () => {
		expect(subject.getTimestamp()).toBe(1529928585000);
	});

	test("#getConfirmations", () => {
		expect(subject.getConfirmations()).toEqual(BigNumber.make(0));
	});

	test("#getTransactionsCount", () => {
		expect(subject.getTransactionsCount()).toBe(0);
	});

	test("#getGenerator", () => {
		expect(subject.getGenerator()).toBe("414b4778beebb48abe0bc1df42e92e0fe64d0c8685");
	});

	test("#getForgedReward", () => {
		expect(subject.getForgedReward()).toEqual(BigNumber.make("0"));
	});

	test("#getForgedAmount", () => {
		expect(subject.getForgedAmount()).toEqual(BigNumber.make("0"));
	});

	test("#getForgedFee", () => {
		expect(subject.getForgedFee()).toEqual(BigNumber.make("0"));
	});

	test("#getForgedTotal", () => {
		expect(subject.getForgedTotal()).toEqual(BigNumber.make("0"));
	});

	test("#toObject", () => {
		expect(subject.toObject()).toEqual(Fixture);
	});
});
