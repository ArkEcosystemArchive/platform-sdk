import { Services as CoinCap } from "@arkecosystem/platform-coincap";
import { Services as CoinGecko } from "@arkecosystem/platform-coingecko";
import { Services as CryptoCompare } from "@arkecosystem/platform-cryptocompare";
import { Contracts } from "@arkecosystem/platform-sdk";

export class PriceTrackerFactory {
	public static make(name: string): Contracts.PriceTracker {
		return {
			coincap: new CoinCap.PriceTracker(),
			coingecko: new CoinGecko.PriceTracker(),
			cryptocompare: new CryptoCompare.PriceTracker(),
		}[name];
	}
}
