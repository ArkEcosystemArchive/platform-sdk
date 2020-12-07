import "jest-extended";

import { convertToCurrency } from "./utils";

test("If `from` equals `base`, return the basic exchange rate for the `to` currency", async () => {
	expect(convertToCurrency(10, { from: "USD", to: "BTC", base: "USD", rates: { BTC: 0.5 } })).toBe(5);
});

test("If `to` equals `base`, return the basic inverse rate of the `from` currency", async () => {
	expect(convertToCurrency(10, { from: "BTC", to: "USD", base: "USD", rates: { BTC: 0.5 } })).toBe(20);
});

test("Otherwise, return the `to` rate multipled by the inverse of the `from` rate to get the relative exchange rate between the two currencies.", async () => {
	expect(convertToCurrency(10, { from: "ARK", to: "BTC", base: "USD", rates: { ARK: 0.5, BTC: 0.5 } })).toBe(10);
});

test("`rates` object does not contain either `from` or `to` currency!", async () => {
	expect(() => convertToCurrency(10, { from: "ARK", to: "BTC", base: null, rates: { BTC: 0.1 } })).toThrow(
		"`rates` object does not contain either `from` or `to` currency!",
	);
});

test("Please specify the `from` and/or `to` currency or use parsing!", async () => {
	expect(() => convertToCurrency(10, { from: null, to: null, base: null, rates: [] })).toThrow(
		"Please specify the `from` and/or `to` currency or use parsing!",
	);
});
