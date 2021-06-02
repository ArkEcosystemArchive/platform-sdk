import { Coins, Contracts, Exceptions, Helpers, Services } from "@arkecosystem/platform-sdk";
import { LCDClient } from "@terra-money/terra.js";

import { useClient } from "./helpers";

export class ClientService extends Services.AbstractClientService {
	readonly #config: Coins.Config;

	private constructor(config: Coins.Config) {
		super();

		this.#config = config;
	}

	public static async __construct(config: Coins.Config): Promise<ClientService> {
		return new ClientService(config);
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse> {
		const result: Services.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			try {
				const { txhash } = await this.useClient().tx.broadcast(transaction.toBroadcast());

				transaction.setAttributes({ identifier: txhash });

				result.accepted.push(transaction.id());
			} catch (error) {
				result.rejected.push(transaction.id());

				result.errors[transaction.id()] = error.message;
			}
		}

		return result;
	}

	private useClient(): LCDClient {
		return useClient(
			`${Helpers.randomHostFromConfig(this.#config)}/api`,
			this.#config.get("network.meta.networkId"),
		);
	}
}
