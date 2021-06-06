import { Coins, Contracts, Exceptions, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import { Connection, PublicKey } from "@solana/web3.js";

import { WalletData } from "../dto";

@IoC.injectable()
export class ClientService extends Services.AbstractClientService {
	readonly #config: Coins.ConfigRepository;
	readonly #client: Connection;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#config = config;
		this.#client = new Connection(this.#host());
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const response = await this.#client.getAccountInfo(new PublicKey(id));

		if (!response) {
			throw new Exceptions.Exception("Received an invalid response.");
		}

		return new WalletData({
			address: id,
			balance: response.lamports,
		});
	}

	public async broadcast(transactions: Contracts.SignedTransactionData[]): Promise<Services.BroadcastResponse> {
		const result: Services.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			try {
				const hash: string = await this.#client.sendEncodedTransaction(transaction.toBroadcast());

				transaction.setAttributes({ identifier: hash });

				result.accepted.push(transaction.id());
			} catch (error) {
				result.rejected.push(transaction.id());

				result.errors[transaction.id()] = error.message;
			}
		}

		return result;
	}

	#host(): string {
		return Helpers.randomHostFromConfig(this.#config);
	}
}
