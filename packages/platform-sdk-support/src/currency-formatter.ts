import { BigNumber, NumberLike } from "./bignumber";

export class CurrencyFormatter {
	// todo: implement generic formatting method
	// https://github.com/ArkEcosystem/desktop-wallet/blob/develop/src/renderer/mixins/currency.js#L7-L100

	public static simpleFormatCrypto(value: NumberLike, token: string): string {
		return `${value} ${token}`;
	}

	public static toBuilder(value: NumberLike, decimals = 8): BigNumber {
		return BigNumber.make(value, decimals);
	}

	public static subToUnit(value: NumberLike, decimals = 8): BigNumber {
		return BigNumber.make(value, decimals).denominated(decimals);
	}

	public static unitToSub(value: NumberLike, decimals = 8): BigNumber {
		return BigNumber.make(value, decimals).times(BigNumber.powerOfTen(decimals));
	}

	public static cryptoToCurrency(
		value: NumberLike,
		price: NumberLike,
		options: { fromSubUnit: boolean; decimals: number } = {
			fromSubUnit: true,
			decimals: 2,
		},
	): string {
		if (options.fromSubUnit) {
			return this.subToUnit(value).decimalPlaces(options.decimals).times(price).toFixed();
		}

		return BigNumber.make(value).decimalPlaces(options.decimals).times(price).toFixed();
	}
}
