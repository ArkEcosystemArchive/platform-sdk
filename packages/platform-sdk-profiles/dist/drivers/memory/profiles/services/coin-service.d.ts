import { Coins } from "@arkecosystem/platform-sdk";
import { ICoinService, IDataRepository } from "../../../../contracts";
export declare class CoinService implements ICoinService {
	#private;
	constructor(dataRepository: IDataRepository);
	/** {@inheritDoc ICoinService.all} */
	all(): Record<string, Coins.Coin>;
	/** {@inheritDoc ICoinService.values} */
	values(): Coins.Coin[];
	/** {@inheritDoc ICoinService.entries} */
	entries(): [string, string[]][];
	/** {@inheritDoc ICoinService.get} */
	get(coin: string, network: string): Coins.Coin;
	/** {@inheritDoc ICoinService.push} */
	set(coin: string, network: string, options?: object): Coins.Coin;
	/** {@inheritDoc ICoinService.has} */
	has(coin: string, network: string): boolean;
	/** {@inheritDoc ICoinService.flush} */
	flush(): void;
}
