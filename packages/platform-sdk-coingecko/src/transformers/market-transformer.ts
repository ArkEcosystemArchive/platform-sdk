import { Contracts, Data } from "@arkecosystem/platform-sdk";

export class MarketTransformer implements Contracts.MarketTransformer {
	public constructor (private readonly data: Contracts.KeyValuePair) { }

	public transform(options: Contracts.KeyValuePair): Contracts.MarketDataCollection {
		const result = {};

		for (const currency of Object.keys(Data.CURRENCIES)) {
			const currencyLowerCase = currency.toLowerCase();

			if (!this.data.current_price[currencyLowerCase]) {
				continue;
			}

			result[currency] = {
				currency,
				price: this.data.current_price[currencyLowerCase],
				marketCap: this.data.market_cap[currencyLowerCase],
				volume: this.data.total_volume[currencyLowerCase],
				date: new Date(this.data.last_updated),
				change24h: this.data.market_cap_change_percentage_24h_in_currency[currencyLowerCase],
			};
		}

		return result;
	}
}
