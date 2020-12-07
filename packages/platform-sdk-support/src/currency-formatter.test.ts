import "jest-extended";

import { BigNumber } from "./bignumber";
import { CurrencyFormatter } from "./currency-formatter";

test("#simpleFormatCrypto", () => {
	expect(CurrencyFormatter.simpleFormatCrypto(10, "ETH")).toBe("10 ETH");
});

test("#toBuilder", () => {
	expect(CurrencyFormatter.toBuilder(10)).toBeInstanceOf(BigNumber);
});

test("#subToUnit", () => {
	expect(CurrencyFormatter.subToUnit(10e8).toString()).toBe("10");
});

test("#unitToSub", () => {
	expect(CurrencyFormatter.unitToSub(10).toString()).toBe("1000000000");
});

test("#cryptoToCurrency with fromSubUnit:true", () => {
	expect(CurrencyFormatter.cryptoToCurrency(10e8, 5)).toBe("50");
});

test("#cryptoToCurrency with fromSubUnit:false", () => {
	expect(CurrencyFormatter.cryptoToCurrency(10, 5, { fromSubUnit: false, decimals: 8 })).toBe("50");
});
