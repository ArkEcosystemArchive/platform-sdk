import { BigNumber, NumberLike } from "./bignumber";
export declare class CurrencyFormatter {
	static simpleFormatCrypto(value: NumberLike, token: string): string;
	static toBuilder(value: NumberLike, decimals?: number): BigNumber;
	static subToUnit(value: NumberLike, decimals?: number): BigNumber;
	static unitToSub(value: NumberLike, decimals?: number): BigNumber;
	static cryptoToCurrency(
		value: NumberLike,
		price: NumberLike,
		options?: {
			fromSubUnit: boolean;
			decimals: number;
		},
	): string;
}
