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

export interface VOut {
	idx: number;
	addresses: string[];
	amount: BigNumber;
}

export interface VIn {
	txid: string;
	vout: number;
}
