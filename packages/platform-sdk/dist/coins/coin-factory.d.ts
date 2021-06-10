import { Coin } from "./coin";
import { CoinOptions, CoinSpec } from "./contracts";
export declare class CoinFactory {
	#private;
	static make(specification: CoinSpec, options: CoinOptions): Coin;
}
