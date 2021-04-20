import { IPortfolio, IPortfolioEntry } from "../../../contracts";
import { State } from "../../../environment/state";

export class Portfolio implements IPortfolio {
	public breakdown(): IPortfolioEntry[] {
		const result: Record<string, IPortfolioEntry> = {};

		for (const wallet of State.profile().wallets().values()) {
			if (wallet.network().isTest()) {
				continue;
			}

			const ticker: string = wallet.network().ticker();

			if (result[ticker] === undefined) {
				result[ticker] = {
					coin: wallet.coin(),
					source: 0,
					target: 0,
					shares: 0,
				};
			}

			result[ticker].source += parseFloat(wallet.balance().toHuman());
			result[ticker].target += parseFloat(wallet.convertedBalance().toString());
		}

		let totalValue: number = 0;

		// Sum
		for (const item of Object.values(result)) {
			totalValue += item.target;
		}

		// Percentages
		for (const item of Object.values(result)) {
			item.shares += (item.target * 100) / totalValue;
		}

		return Object.values(result);
	}
}
