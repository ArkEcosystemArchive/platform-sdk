import { KeyValuePair } from "../../../../types";
import { CURRENCIES } from "../../../config";
import { MarketDataCollection, MarketTransformer as TransformerContract } from "../../../contracts/market";
import { convertToCurrency } from "../utils";

export class MarketTransformer implements TransformerContract {
	// All prices on the CoinCap API are standardized in USD (United States Dollar)
	private readonly baseCurrency: string = "USD";

	public constructor(private readonly data: KeyValuePair) {}

	public transform(options: KeyValuePair): MarketDataCollection {
		const tokenId = options.token.toUpperCase();
		const marketResponse = {};

		for (const currency of Object.keys(CURRENCIES)) {
			const { assets, rates } = this.data;

			if (!assets[currency]) {
				continue;
			}

			marketResponse[currency] = {
				currency,
				price: convertToCurrency(1, {
					from: currency,
					to: tokenId,
					base: this.baseCurrency,
					rates,
				}),
				marketCap: assets[tokenId].marketCapUsd * (rates[this.baseCurrency] / rates[currency]),
				volume: assets[tokenId].volumeUsd24Hr * (rates[this.baseCurrency] / rates[currency]),
				date: new Date(this.data.timestamp),
				change24h: null,
			};
		}

		return marketResponse;
	}
}
