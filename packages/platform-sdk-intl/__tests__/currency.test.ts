import { Currency } from "../src/currency";

test("#fromString", () => {
	expect(
		Currency.fromString(
			{
				name: "bitcoin",
				code: "BTC",
				magnitude: 8,
			},
			"Ѧ 0,0001",
		),
	).toEqual({ display: "0.0001", value: "10000" });

	expect(
		Currency.fromString(
			{
				name: "bitcoin",
				code: "BTC",
				magnitude: 8,
			},
			"R$ 45,210.21",
		),
	).toEqual({ display: "45.21021", value: "4521021000" });

	expect(
		Currency.fromString(
			{
				name: "bitcoin",
				code: "BTC",
				magnitude: 8,
			},
			"$ 45.210,21",
		),
	).toEqual({ display: "45.21021", value: "4521021000" });

	expect(
		Currency.fromString(
			{
				name: "bitcoin",
				code: "BTC",
				magnitude: 8,
			},
			"Ѧ 0.100000008123",
		),
	).toEqual({ display: "0.10000000", value: "10000000" });

	expect(
		Currency.fromString(
			{
				name: "bitcoin",
				code: "BTC",
				magnitude: 8,
			},
			"52,21579",
		),
	).toEqual({ display: "52.21579", value: "5221579000" });
});
