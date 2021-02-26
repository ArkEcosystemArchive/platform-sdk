import { Contracts, Data } from "@arkecosystem/platform-sdk";

import { convertToCurrency } from "../utils";

export class MarketTransformer implements Contracts.MarketTransformer {
	// All prices on the CoinCap API are standardized in USD (United States Dollar)
	private readonly baseCurrency: string = "USD";

	public constructor(private readonly data: Contracts.KeyValuePair) {}

	public transform(options: Contracts.KeyValuePair): Contracts.MarketDataCollection {
		const tokenId = options["token"].toUpperCase();
		const result = {};

		for (const currency of Object.keys(options["currencies"] || Data.CURRENCIES)) {
			const { assets, rates } = this.data;

			if (!assets[currency]) {
				continue;
			}

			result[currency] = {
				currency,
				price: convertToCurrency(1, {
					from: currency,
					to: tokenId,
					base: this.baseCurrency,
					rates,
				}),
				marketCap: this.normalise(assets[tokenId].marketCapUsd, rates, currency),
				volume: this.normalise(assets[tokenId].volumeUsd24Hr, rates, currency),
				date: new Date(this.data["timestamp"]),
				change24h: null,
			};
		}

		return result;
	}

	private normalise(marketCapUsd: number, rates: object, currency: string): number {
		return marketCapUsd * (rates[this.baseCurrency] / rates[currency]);
	}
}
