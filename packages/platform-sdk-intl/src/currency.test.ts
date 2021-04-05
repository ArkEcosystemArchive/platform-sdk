import { Currency } from "./currency";

test("#fromString", () => {
	expect(Currency.fromString("")).toEqual({ display: "", value: undefined });

	expect(Currency.fromString("0")).toEqual({ display: "0", value: "0" });

	expect(Currency.fromString("Ѧ 0,0001")).toEqual({ display: "0.0001", value: "10000" });

	expect(Currency.fromString("R$ 45,210.21")).toEqual({ display: "45.21021", value: "4521021000" });

	expect(Currency.fromString("$ 45.210,21")).toEqual({ display: "45.21021", value: "4521021000" });

	expect(Currency.fromString("Ѧ 0.1000000081283")).toEqual({ display: "0.10000000", value: "10000000" });

	expect(Currency.fromString("52,21579")).toEqual({ display: "52.21579", value: "5221579000" });
});
