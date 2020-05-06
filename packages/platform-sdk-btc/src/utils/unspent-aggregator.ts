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

	public async aggregate(address: string, amount: BigNumber): Promise<UnspentTransaction[]> {
		const { result } = await Utils.postJSON(this.#peer, "/", {
			jsonrpc: "2.0",
			method: "listunspent",
			params: [1, 9999999, [address]],
		});

		return result;
	}
}
