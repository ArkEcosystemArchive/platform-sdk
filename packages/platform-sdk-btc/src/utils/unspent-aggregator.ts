import { Contracts, Utils } from "@arkecosystem/platform-sdk";
import BigNumber from "bignumber.js";

import { UnspentTransaction } from "../contracts";

export class UnspentAggregator {
	readonly #peer;

	private constructor(opts: Contracts.KeyValuePair) {
		this.#peer = opts.peer;
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<UnspentAggregator> {
		return new UnspentAggregator(opts);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async aggregate(address: string, amount: Utils.BigNumber): Promise<UnspentTransaction[]> {
		const response = await Utils.Http.new(this.#peer).get(`wallets/${address}/transactions/unspent`);

		return response.map((transaction) => ({
			address: transaction.address,
			txId: transaction.mintTxid,
			outputIndex: transaction.mintIndex,
			script: transaction.script,
			satoshis: transaction.value,
		}));
	}
}
