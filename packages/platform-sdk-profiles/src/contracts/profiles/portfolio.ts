import { Coins } from "@arkecosystem/platform-sdk";

export interface IPortfolioItem {
	coin: Coins.Coin;
	source: number;
	target: number;
	shares: number;
}

export interface IPortfolio {
	breakdown(): IPortfolioItem[];
}
