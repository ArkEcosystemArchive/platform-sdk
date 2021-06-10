"use strict";
/* istanbul ignore file */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
// Based on https://github.com/LedgerHQ/ledger-live-common/blob/master/src/currencies/sanitizeValueString.js
const getSeparators = (locale) => {
	const localeNotAvailable = (1.2).toLocaleString("en", { style: "currency", currency: "USD" }) !== "$1.20";
	let result;
	if (localeNotAvailable) {
		const staticFallback = {
			en: ["-$1.00", "10,000.2"],
			es: ["-1,00 US$", "10.000,2"],
			fr: ["-1,00 $US", "10 000,2"],
			ja: ["-US$1.00", "10,000.2"],
			ko: ["-US$1.00", "10,000.2"],
			ru: ["-1,00 $", "10 000,2"],
			zh: ["-US$1.00", "10,000.2"],
		};
		result = staticFallback[Object.keys(staticFallback).includes(locale) ? locale : "en"][1];
	} else {
		result = (10000.2).toLocaleString(locale);
	}
	let decimal;
	let thousands;
	for (let i = 0; i < result.length; i++) {
		const c = result[i];
		if (/[0-9]/.test(c)) {
			continue;
		}
		if (!thousands) {
			thousands = c;
		} else {
			decimal = c;
		}
	}
	return { decimal, thousands };
};
/**
 * Implements the normalisation of any currency-like string.
 *
 * @export
 * @class Currency
 */
class Currency {
	/**
	 * Normalise the given vallue using the given magnitude.
	 *
	 * @static
	 * @param {string} valueString
	 * @param {number} [magnitude=8]
	 * @param {string} [locale]
	 * @returns {{
	 * 		display: string;
	 * 		value?: string;
	 * 	}}
	 * @memberof Currency
	 */
	static fromString(valueString, magnitude = 8, locale) {
		const seperator = getSeparators(locale || "en-US");
		const dot = seperator.decimal || ".";
		let display = "";
		let value = "";
		let decimals = -1;
		if (!valueString) {
			return { display, value: undefined };
		}
		for (let i = 0; i < valueString.length; i++) {
			const c = valueString[i];
			if ("0123456789".indexOf(c) !== -1) {
				if (decimals >= 0) {
					decimals++;
					if (decimals > magnitude) {
						break;
					}
					value = value === "0" ? c : value + c;
					display += c;
				} else if (value !== "0") {
					value += c;
					display += c;
				} else {
					value = c;
					display = c;
				}
			} else if (decimals === -1 && (c === "," || c === ".")) {
				if (magnitude === 0) {
					// in this specific case, we will never allow commas
					return { display, value };
				}
				if (i === 0) {
					display = "0";
				}
				decimals = 0;
				display += dot;
			}
		}
		if (value && value !== "0") {
			for (let i = Math.max(0, decimals); i < magnitude; ++i) {
				value += "0";
			}
		}
		if (!value) {
			value = "0";
		}
		return { display, value };
	}
}
exports.Currency = Currency;
//# sourceMappingURL=currency.js.map
