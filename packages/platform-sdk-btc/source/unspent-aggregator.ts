import { Coins, Helpers, IoC } from "@arkecosystem/platform-sdk";

import { HttpClient } from "@arkecosystem/platform-sdk-http";

import { UnspentTransaction } from "./contracts";

@IoC.injectable()
export class UnspentAggregator {
	@IoC.inject(IoC.BindingType.HttpClient)
	private readonly http!: HttpClient;

	@IoC.inject(IoC.BindingType.ConfigRepository)
	protected readonly configRepository!: Coins.ConfigRepository;

	public async aggregate(address: string): Promise<UnspentTransaction[]> {
		const peer = Helpers.randomHostFromConfig(this.configRepository);
		const response = (await this.http.get(`${peer}/wallets/${address}/transactions/unspent`)).json();

		return response.map((transaction) => ({
			address: transaction.address,
			txId: transaction.mintTxid,
			outputIndex: transaction.mintIndex,
			script: transaction.script,
			satoshis: transaction.value,
		}));
	}
}
