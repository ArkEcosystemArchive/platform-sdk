import { BigNumber } from "@arkecosystem/utils";

import { Block } from "../../src/dto";
import Fixture from "../__fixtures__/client/getBlock.json";

let subject: Block;

beforeEach(() => (subject = new Block(Fixture.data[0])));

describe("Lisk", function () {
	test("#getId", () => {
		expect(subject.getId()).toBe("1676747649530141145");
	});

	test("#getHeight", () => {
		expect(subject.getHeight()).toBe(11851620);
	});

	test("#getTimestamp", () => {
		expect(subject.getTimestamp()).toBe(121095500);
	});

	test("#getConfirmations", () => {
		expect(subject.getConfirmations()).toEqual(BigNumber.make(4));
	});

	test("#getTransactionsCount", () => {
		expect(subject.getTransactionsCount()).toBe(0);
	});

	test("#getGenerator", () => {
		expect(subject.getGenerator()).toBe("a2fc2420262f081d0f6426364301ef40597756e163f6b1fd813eff9b03594125");
	});

	test("#getForgedReward", () => {
		expect(subject.getForgedReward()).toEqual(BigNumber.make("200000000"));
	});

	test("#getForgedAmount", () => {
		expect(subject.getForgedAmount()).toEqual(BigNumber.make(0));
	});

	test("#getForgedFee", () => {
		expect(subject.getForgedFee()).toEqual(BigNumber.make(0));
	});

	test("#getForgedTotal", () => {
		expect(subject.getForgedTotal()).toEqual(BigNumber.make("200000000"));
	});

	test("#toObject", () => {
		expect(subject.toObject()).toEqual(Fixture.data[0]);
	});
});
