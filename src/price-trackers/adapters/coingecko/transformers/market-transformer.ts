import { KeyValuePair } from "../../../../types";
import { CURRENCIES } from "../../../config";
import { MarketDataCollection, MarketTransformer as TransformerContract } from "../../../contracts/market";

export class MarketTransformer implements TransformerContract {
	public constructor(private readonly data: KeyValuePair) {}

	public transform(options: KeyValuePair): MarketDataCollection {
		const result = {};

		for (const currency of Object.keys(CURRENCIES)) {
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
