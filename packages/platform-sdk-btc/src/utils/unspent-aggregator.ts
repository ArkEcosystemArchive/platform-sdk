import { BigNumber, Http } from "@arkecosystem/platform-sdk-support";

import { UnspentTransaction } from "../contracts";

export class UnspentAggregator {
	readonly #peer;

	public constructor(peer: string) {
		this.#peer = peer;
	}

	public async aggregate(address: string, amount: BigNumber): Promise<UnspentTransaction[]> {
		const response = await Http.new(this.#peer).get(`wallets/${address}/transactions/unspent`);

		return response.map((transaction) => ({
			address: transaction.address,
			txId: transaction.mintTxid,
			outputIndex: transaction.mintIndex,
			script: transaction.script,
			satoshis: transaction.value,
		}));
	}
}
