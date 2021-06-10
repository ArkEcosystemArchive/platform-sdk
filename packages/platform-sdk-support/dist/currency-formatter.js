"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyFormatter = void 0;
const bignumber_1 = require("./bignumber");
class CurrencyFormatter {
	// todo: implement generic formatting method
	// https://github.com/ArkEcosystem/desktop-wallet/blob/develop/src/renderer/mixins/currency.js#L7-L100
	static simpleFormatCrypto(value, token) {
		return `${value} ${token}`;
	}
	static toBuilder(value, decimals = 8) {
		return bignumber_1.BigNumber.make(value, decimals);
	}
	static subToUnit(value, decimals = 8) {
		return bignumber_1.BigNumber.make(value, decimals).denominated(decimals);
	}
	static unitToSub(value, decimals = 8) {
		return bignumber_1.BigNumber.make(value, decimals).times(bignumber_1.BigNumber.powerOfTen(decimals));
	}
	static cryptoToCurrency(
		value,
		price,
		options = {
			fromSubUnit: true,
			decimals: 2,
		},
	) {
		if (options.fromSubUnit) {
			return this.subToUnit(value).decimalPlaces(options.decimals).times(price).toFixed();
		}
		return bignumber_1.BigNumber.make(value).decimalPlaces(options.decimals).times(price).toFixed();
	}
}
exports.CurrencyFormatter = CurrencyFormatter;
//# sourceMappingURL=currency-formatter.js.map
