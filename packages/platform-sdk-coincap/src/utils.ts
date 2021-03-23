/**
 *
 *
 * @param {*} amount
 * @param {*} { from, to, base, rates }
 * @returns {number}
 */
export const convertToCurrency = (amount, { from, to, base, rates }): number => {
	if (from && to) {
		const baseAmount = amount * 100;

		// If `from` equals `base`, return the basic exchange rate for the `to` currency
		if (from === base && Object.prototype.hasOwnProperty.call(rates, to)) {
			return baseAmount * (rates[to] / 100);
		}

		// If `to` equals `base`, return the basic inverse rate of the `from` currency
		if (to === base && Object.prototype.hasOwnProperty.call(rates, from)) {
			return baseAmount * (1 / rates[from] / 100);
		}

		// Otherwise, return the `to` rate multipled by the inverse of the `from` rate to get the relative exchange rate between the two currencies.
		if (Object.prototype.hasOwnProperty.call(rates, from) && Object.prototype.hasOwnProperty.call(rates, to)) {
			return baseAmount * ((rates[to] * (1 / rates[from])) / 100);
		}

		throw new Error("`rates` object does not contain either `from` or `to` currency!");
	}

	throw new Error("Please specify the `from` and/or `to` currency or use parsing!");
};
