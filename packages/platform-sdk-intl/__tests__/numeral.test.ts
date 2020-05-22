import { Numeral } from "../src/numeral";

test("#format", () => {
	expect(Numeral.make("fi-FI").format(5000)).toBe("5,000");
});

test("#formatCurrency", () => {
	expect(Numeral.make("fi-FI").formatCurrency(5000, "EUR")).toBe("€5,000.00");
});
