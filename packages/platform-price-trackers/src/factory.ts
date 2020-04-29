import { PriceTracker as CoinCap } from "@arkecosystem/platform-coincap";
import { PriceTracker as CoinGecko } from "@arkecosystem/platform-coingecko";
import { PriceTracker as CryptoCompare } from "@arkecosystem/platform-cryptocompare";
import { Contracts } from "@arkecosystem/platform-sdk";

export class PriceTrackerFactory {
	public static make(name: string): Contracts.PriceTracker {
		return {
			coincap: new CoinCap(),
			coingecko: new CoinGecko(),
			cryptocompare: new CryptoCompare(),
		}[name];
	}
}
