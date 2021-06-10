import "jest-extended";

import { CURRENCIES } from "./currencies";

test("CURRENCIES", () => {
	expect(CURRENCIES).toMatchInlineSnapshot(`
		Object {
		  "AUD": Object {
		    "decimals": 2,
		    "symbol": "A$",
		  },
		  "BRL": Object {
		    "decimals": 2,
		    "symbol": "R$",
		  },
		  "BTC": Object {
		    "decimals": 8,
		    "symbol": "Ƀ",
		  },
		  "CAD": Object {
		    "decimals": 2,
		    "symbol": "C$",
		  },
		  "CHF": Object {
		    "decimals": 2,
		    "symbol": "CHF",
		  },
		  "CNY": Object {
		    "decimals": 2,
		    "symbol": "¥",
		  },
		  "ETH": Object {
		    "decimals": 8,
		    "symbol": "Ξ",
		  },
		  "EUR": Object {
		    "decimals": 2,
		    "symbol": "€",
		  },
		  "GBP": Object {
		    "decimals": 2,
		    "symbol": "£",
		  },
		  "HKD": Object {
		    "decimals": 2,
		    "symbol": "HK$",
		  },
		  "IDR": Object {
		    "decimals": 2,
		    "symbol": "IDR",
		  },
		  "INR": Object {
		    "decimals": 2,
		    "symbol": "₹",
		  },
		  "JPY": Object {
		    "decimals": 0,
		    "symbol": "¥",
		  },
		  "KRW": Object {
		    "decimals": 0,
		    "symbol": "₩",
		  },
		  "LTC": Object {
		    "decimals": 8,
		    "symbol": "Ł",
		  },
		  "MXN": Object {
		    "decimals": 2,
		    "symbol": "MX$",
		  },
		  "RUB": Object {
		    "decimals": 2,
		    "symbol": "₽",
		  },
		  "USD": Object {
		    "decimals": 2,
		    "symbol": "$",
		  },
		}
	`);
});
