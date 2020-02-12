import { CoinCap } from "./trackers/adapters/coincap";
import { CoinGecko } from "./trackers/adapters/coingecko";
import { CryptoCompare } from "./trackers/adapters/cryptocompare";
import { Tracker } from "./trackers/contracts";

export class TrackerFactory {
	public static make(name: string): Tracker {
		return {
			coincap: new CoinCap(),
			coingecko: new CoinGecko(),
			cryptocompare: new CryptoCompare(),
		}[name];
	}
}
