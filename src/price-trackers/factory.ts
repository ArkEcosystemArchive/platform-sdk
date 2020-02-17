import { CoinCap } from "./adapters/coincap";
import { CoinGecko } from "./adapters/coingecko";
import { CryptoCompare } from "./adapters/cryptocompare";
import { PriceTracker } from "./contracts";

export class PriceTrackerFactory {
	public static make(name: string): PriceTracker {
		return {
			coincap: new CoinCap(),
			coingecko: new CoinGecko(),
			cryptocompare: new CryptoCompare(),
		}[name];
	}
}
