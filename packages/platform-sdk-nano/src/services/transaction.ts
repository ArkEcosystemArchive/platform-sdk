import { Coins, Contracts, IoC, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { computeWork } from "nanocurrency";
import { block, tools } from "nanocurrency-web";

import { deriveAccount } from "./helpers";
import { NanoClient } from "./rpc";

@IoC.injectable()
export class TransactionService extends Services.AbstractTransactionService {
	#client!: NanoClient;
	#decimals!: number;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#client = new NanoClient(this.configRepository);
		this.#decimals = this.configRepository.get(Coins.ConfigKey.CurrencyDecimals);
	}

	public async transfer(
		input: Services.TransferInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		const { address, privateKey } = deriveAccount(input.signatory.signingKey());
		const { balance, representative, frontier } = await this.#client.accountInfo(address, { representative: true });

		const data = {
			walletBalanceRaw: balance,
			fromAddress: input.signatory.address(),
			toAddress: input.data.to,
			representativeAddress: representative,
			frontier,
			amountRaw: tools.convert(input.data.amount.toString(), "NANO", "RAW"),
			work: (await computeWork(frontier))!,
		};
		const signedData = { ...data, timestamp: DateTime.make() };
		const broadcastData = block.send(data, privateKey);

		return this.dataTransferObjectService.signedTransaction(broadcastData.signature, signedData, broadcastData);
	}
}
