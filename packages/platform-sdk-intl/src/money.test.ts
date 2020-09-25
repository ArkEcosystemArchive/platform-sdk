import "jest-extended";

import { Money } from "./money";

let subject: Money;
beforeEach(() => (subject = Money.make(5000, "EUR")));

test("#getAmount", () => {
	expect(subject.getAmount()).toBe(5000);
});

test("#setLocale", () => {
	expect(subject.setLocale("de-DE").format()).toBe("€50.00");
});

test("#plus", () => {
	expect(subject.plus(Money.make(1000, "EUR")).getAmount()).toBe(6000);
});

test("#minus", () => {
	expect(subject.minus(Money.make(1000, "EUR")).getAmount()).toBe(4000);
});

test("#times", () => {
	expect(subject.times(10).getAmount()).toBe(50000);
});

test("#divide", () => {
	expect(subject.divide(10).getAmount()).toBe(500);
});

test("#isEqualTo", () => {
	expect(subject.isEqualTo(Money.make(5000, "EUR"))).toBeTrue();
	expect(subject.isEqualTo(Money.make(1000, "EUR"))).toBeFalse();
});

test("#isLessThan", () => {
	expect(subject.isLessThan(Money.make(6000, "EUR"))).toBeTrue();
	expect(subject.isLessThan(Money.make(5000, "EUR"))).toBeFalse();
	expect(subject.isLessThan(Money.make(4000, "EUR"))).toBeFalse();
});

test("#isLessThanOrEqual", () => {
	expect(subject.isLessThanOrEqual(Money.make(5000, "EUR"))).toBeTrue();
	expect(subject.isLessThanOrEqual(Money.make(6000, "EUR"))).toBeTrue();
	expect(subject.isLessThanOrEqual(Money.make(4000, "EUR"))).toBeFalse();
});

test("#isGreaterThan", () => {
	expect(subject.isGreaterThan(Money.make(1000, "EUR"))).toBeTrue();
	expect(subject.isGreaterThan(Money.make(1000, "EUR"))).toBeTrue();
	expect(subject.isGreaterThan(Money.make(6000, "EUR"))).toBeFalse();
});

test("#isGreaterThanOrEqual", () => {
	expect(subject.isGreaterThanOrEqual(Money.make(1000, "EUR"))).toBeTrue();
	expect(subject.isGreaterThanOrEqual(Money.make(1000, "EUR"))).toBeTrue();
	expect(subject.isGreaterThanOrEqual(Money.make(6000, "EUR"))).toBeFalse();
});

test("#isPositive", () => {
	expect(Money.make(1, "EUR").isPositive()).toBeTrue();
	expect(Money.make(-1, "EUR").isPositive()).toBeFalse();
});

test("#isNegative", () => {
	expect(Money.make(-1, "EUR").isNegative()).toBeTrue();
	expect(Money.make(1, "EUR").isNegative()).toBeFalse();
});

test("#getCurrency", () => {
	expect(subject.getCurrency()).toBe("EUR");
});

test("#format", () => {
	expect(subject.format()).toBe("€50.00");
});

test("#toUnit", () => {
	expect(subject.toUnit()).toBe(50);
});
