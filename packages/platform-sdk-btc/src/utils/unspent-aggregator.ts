import { Utils } from "@arkecosystem/platform-sdk";

import { UnspentTransaction } from "../contracts";

export class UnspentAggregator {
	readonly #peer;

	public constructor(peer: string) {
		this.#peer = peer;
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
