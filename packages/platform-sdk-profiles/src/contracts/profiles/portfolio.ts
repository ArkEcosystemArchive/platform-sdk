import { Coins } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export interface IPortfolioItem {
	coin: Coins.Coin;
	source: BigNumber;
	target: BigNumber;
}

export interface IPortfolio {
	breakdown(): IPortfolioItem[];
}
