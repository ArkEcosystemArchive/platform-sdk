import "jest-extended";

import { BigNumber } from "./bignumber";

let subject: BigNumber;
beforeEach(() => (subject = BigNumber.make(1)));

test("#decimalPlaces", () => {
	expect(BigNumber.make("12.3456789").decimalPlaces(0).valueOf()).toBe("12");
	expect(BigNumber.make("12.3456789").decimalPlaces(2).valueOf()).toBe("12.35");
	expect(BigNumber.make("12.3456789").decimalPlaces(4).valueOf()).toBe("12.3457");
	expect(BigNumber.make("12.3456789").decimalPlaces(6).valueOf()).toBe("12.345679");
});

test("#plus", () => {
	expect(BigNumber.make(10).plus(1).valueOf()).toBe("11");
});

test("#minus", () => {
	expect(BigNumber.make(10).minus(1).valueOf()).toBe("9");
});

test("#divide", () => {
	expect(BigNumber.make(10).divide(2).valueOf()).toBe("5");
});

test("#times", () => {
	expect(BigNumber.make(10).times(2).valueOf()).toBe("20");
});

test("#sum", () => {
	expect(BigNumber.sum([BigNumber.ONE, 1, "2", 3.0, 5]).valueOf()).toBe("12");
});

test("#powerOfTen", () => {
	expect(BigNumber.powerOfTen(0).valueOf()).toBe("1");
	expect(BigNumber.powerOfTen(1).valueOf()).toBe("10");
	expect(BigNumber.powerOfTen(2).valueOf()).toBe("100");
	expect(BigNumber.powerOfTen("2").valueOf()).toBe("100");
});

test("#isNaN", () => {
	expect(BigNumber.make(NaN).isNaN()).toBeTrue();
	expect(subject.isNaN()).toBeFalse();
});

test("#isPositive", () => {
	expect(subject.isPositive()).toBeTrue();
	expect(subject.minus(10).isPositive()).toBeFalse();
});

test("#isNegative", () => {
	expect(subject.isNegative()).toBeFalse();
	expect(subject.minus(10).isNegative()).toBeTrue();
});

test("#isFinite", () => {
	expect(subject.isFinite()).toBeTrue();
	expect(BigNumber.make(Infinity).isFinite()).toBeFalse();
});

test("#isZero", () => {
	expect(subject.isZero()).toBeFalse();
	expect(BigNumber.make(0).isZero()).toBeTrue();
});

test("#comparedTo", () => {
	expect(subject.comparedTo(BigNumber.make(1))).toBe(0);
	expect(subject.comparedTo(BigNumber.make(0))).toBe(1);
	expect(subject.comparedTo(BigNumber.make(-1))).toBe(1);
	expect(subject.comparedTo(BigNumber.make(2))).toBe(-1);
});

test("#isEqualTo", () => {
	expect(subject.isEqualTo(BigNumber.make(1))).toBeTrue();
	expect(subject.isEqualTo(BigNumber.make(2))).toBeFalse();
});

test("#isGreaterThan", () => {
	expect(subject.isGreaterThan(BigNumber.make(0))).toBeTrue();
	expect(subject.isGreaterThan(BigNumber.make(2))).toBeFalse();
});

test("#isGreaterThanOrEqualTo", () => {
	expect(subject.isGreaterThanOrEqualTo(BigNumber.make(0))).toBeTrue();
	expect(subject.isGreaterThanOrEqualTo(BigNumber.make(1))).toBeTrue();
	expect(subject.isGreaterThanOrEqualTo(BigNumber.make(0))).toBeTrue();
	expect(subject.isGreaterThanOrEqualTo(BigNumber.make(3))).toBeFalse();
});

test("#isLessThan", () => {
	expect(subject.isLessThan(BigNumber.make(2))).toBeTrue();
	expect(subject.isLessThan(BigNumber.make(1))).toBeFalse();
});

test("#isLessThanOrEqualTo", () => {
	expect(subject.isLessThanOrEqualTo(BigNumber.make(1))).toBeTrue();
	expect(subject.isLessThanOrEqualTo(BigNumber.make(1))).toBeTrue();
	expect(subject.isLessThanOrEqualTo(BigNumber.make(2))).toBeTrue();
	expect(subject.isLessThanOrEqualTo(BigNumber.make(0))).toBeFalse();
});

test("#toHuman", () => {
	expect(BigNumber.make(100 * 1e8).toHuman()).toBe("100.00000000");
	expect(BigNumber.make(123.456 * 1e8).toHuman()).toBe("123.45600000");
	expect(BigNumber.make(123.456789 * 1e8).toHuman()).toBe("123.45678900");
	expect(BigNumber.make(1e8).times(1e8).toHuman()).toBe(`${1e8}.00000000`);
});

test.each([
	[2, 1e2, "100.00"],
	[3, 1e3, "100.000"],
	[4, 1e4, "100.0000"],
	[5, 1e5, "100.00000"],
	[6, 1e6, "100.000000"],
	[7, 1e7, "100.0000000"],
	[8, 1e8, "100.00000000"],
	[9, 1e9, "100.000000000"],
	[10, 1e10, "100.0000000000"],
])("#toHuman(%s)", (decimals, multiplier, expected) => {
	expect(BigNumber.make(100 * multiplier, decimals).toHuman()).toBe(expected);
	expect(BigNumber.make(100 * multiplier).toHuman(decimals)).toBe(expected);
});

test("#toFixed", () => {
	expect(subject.toFixed()).toEqual("1");
	expect(subject.toFixed(2)).toEqual("1.00");
});

test("#toNumber", () => {
	expect(subject.toNumber()).toEqual(1);
});

test("#toString", () => {
	expect(subject.toString()).toEqual("1");
});

test("#valueOf", () => {
	expect(subject.valueOf()).toEqual("1");
});
