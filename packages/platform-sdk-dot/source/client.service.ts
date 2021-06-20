import { Contracts, IoC, Services } from "@arkecosystem/platform-sdk";
import { ApiPromise } from "@polkadot/api";

import { BindingType } from "./constants";
import { WalletData } from "./wallet.dto";

@IoC.injectable()
export class ClientService extends Services.AbstractClientService {
	@IoC.inject(BindingType.ApiPromise)
	protected readonly client!: ApiPromise;

	public async __destruct(): Promise<void> {
		await this.client.disconnect();
	}

	public override async wallet(id: string): Promise<Contracts.WalletData> {
		const { data: balances, nonce } = await this.client.query.system.account(id);

		return this.dataTransferObjectService.wallet({
			address: id,
			balance: balances.free.toString(),
			nonce: nonce.toString(),
		});
	}

	public override async broadcast(
		transactions: Contracts.SignedTransactionData[],
	): Promise<Services.BroadcastResponse> {
		const result: Services.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			try {
				await this.client.rpc.author.submitExtrinsic(transaction.toBroadcast());

				result.accepted.push(transaction.id());
			} catch (error) {
				result.rejected.push(transaction.id());

				result.errors[transaction.id()] = error.message;
			}
		}

		return result;
	}
}
