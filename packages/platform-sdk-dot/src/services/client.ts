import { Coins, Contracts, IoC, Services } from "@arkecosystem/platform-sdk";
import { ApiPromise } from "@polkadot/api";

import { WalletData } from "../dto";
import { createRpcClient } from "../helpers";

@IoC.injectable()
export class ClientService extends Services.AbstractClientService {
	#client!: ApiPromise;

	@IoC.postConstruct()
	private async onPostConstruct(): Promise<void> {
		this.#client = await createRpcClient(this.configRepository);
	}


	public async __destruct(): Promise<void> {
		await this.#client.disconnect();
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const { data: balances, nonce } = await this.#client.query.system.account(id);

		return new WalletData({
			address: id,
			balance: balances.free.toString(),
			nonce: nonce.toString(),
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
				await this.#client.rpc.author.submitExtrinsic(transaction.toBroadcast());

				result.accepted.push(transaction.id());
			} catch (error) {
				result.rejected.push(transaction.id());

				result.errors[transaction.id()] = error.message;
			}
		}

		return result;
	}
}
