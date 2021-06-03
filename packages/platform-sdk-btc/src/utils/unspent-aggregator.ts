import { HttpClient } from "@arkecosystem/platform-sdk-http";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { UnspentTransaction } from "../contracts";

export class UnspentAggregator {
	readonly #http: HttpClient;
	readonly #peer: string;

	public constructor({ http, peer }) {
		this.#http = http;
		this.#peer = peer;
	}

	public async aggregate(address: string, amount: BigNumber): Promise<UnspentTransaction[]> {
		const response = (await this.#http.get(`${this.#peer}/wallets/${address}/transactions/unspent`)).json();

		return response.map((transaction) => ({
			address: transaction.address,
			txId: transaction.mintTxid,
			outputIndex: transaction.mintIndex,
			script: transaction.script,
			satoshis: transaction.value,
		}));
	}
}
