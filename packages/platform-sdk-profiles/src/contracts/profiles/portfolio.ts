import { Coins } from "@arkecosystem/platform-sdk";

/**
 * Defines the structure that represents a portfolio entry.
 *
 * @export
 * @interface IPortfolioEntry
 */
export interface IPortfolioEntry {
	coin: Coins.Coin;
	source: number;
	target: number;
	shares: number;
}

/**
 * Defines the implementation contract for the portfolio service.
 *
 * @export
 * @interface IPortfolio
 */
export interface IPortfolio {
	/**
	 * Calculates a breakdown of all coins in the profile.
	 *
	 * @return {*}  {IPortfolioEntry[]}
	 * @memberof IPortfolio
	 */
	breakdown(): IPortfolioEntry[];
}
