import { Services as CoinCap } from "@arkecosystem/platform-sdk-coincap";
import { Services as CoinGecko } from "@arkecosystem/platform-sdk-coingecko";
import { Services as CryptoCompare } from "@arkecosystem/platform-sdk-cryptocompare";
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
