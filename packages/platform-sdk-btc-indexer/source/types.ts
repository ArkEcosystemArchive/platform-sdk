/**
 * The flags that can be passed in through the CLI.
 *
 * @export
 * @interface Flags
 */
import { BigNumber } from "@arkecosystem/utils";

export interface Flags {
	network: string;
	host: string;
	database: string;
	batchSize: number;
}

export interface Output {
	idx: number;
	addresses: string[];
	amount: BigNumber;
}

export interface Input {
	txid: string;
	vout: number;
}
