import { Numeral } from "./numeral";

test("#format", () => {
	expect(Numeral.make("en").format(5000)).toBe("5,000");
});

test("#formatAsCurrency", () => {
	expect(Numeral.make("en").formatAsCurrency(5000, "EUR")).toBe("€5,000.00");
});

test("#formatAsUnit", () => {
	expect(Numeral.make("en").formatAsUnit(5000, "kilobyte")).toBe("5,000 kB");
});
