import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { UnspentTransaction } from "./contracts";
export declare class UnspentAggregator {
	#private;
	constructor({ http, peer }: { http: any; peer: any });
	aggregate(address: string, amount: BigNumber): Promise<UnspentTransaction[]>;
}
