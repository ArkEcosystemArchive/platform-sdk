import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { IExchangeRateService, IPortfolio, IPortfolioItem, IProfile } from "../../../contracts";
import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";

export class Portfolio implements IPortfolio {
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	public breakdown(): IPortfolioItem[] {
		const result: IPortfolioItem[] = [];

		for (const wallet of this.#profile.wallets().values()) {
			if (wallet.network().isTest()) {
				continue;
			}

			const ticker: string = wallet.network().ticker();

			if (result[ticker] === undefined) {
				result[ticker] = {
					coin: wallet.coin(),
					source: BigNumber.ZERO,
					target: BigNumber.ZERO,
				};
			}

			result[ticker].source.plus(wallet.balance());
		}

		for (const item of result) {
			item.target = container
				.get<IExchangeRateService>(Identifiers.ExchangeRateService)
				.exchange(item.coin.network().ticker(), 'USD', DateTime.make(), item.source.divide(1e8));
		}

		return result;
	}
}
