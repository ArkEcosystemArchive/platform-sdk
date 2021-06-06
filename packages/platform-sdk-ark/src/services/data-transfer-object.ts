import { Coins, Contracts, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";

import * as DTO from "../dto";

@IoC.injectable()
export class DataTransferObjectService extends Services.AbstractDataTransferObjectService {
	// @TODO: rework so that the container is not needed, this is a weird setup
	@IoC.inject(IoC.BindingType.Container)
	private readonly container!: IoC.Container;

	public signedTransaction(
		identifier: string,
		signedData: Contracts.RawTransactionData,
		broadcastData: any,
	): Contracts.SignedTransactionData {
		const signedTransaction = this.container.resolve(DTO.SignedTransactionData)
		signedTransaction.configure(identifier, signedData, broadcastData, this.configRepository.get(Coins.ConfigKey.CurrencyDecimals));

		return signedTransaction;
	}

	public transaction(transaction: Contracts.KeyValuePair): Contracts.TransactionDataType {
		return Helpers.createTransactionDataWithType(transaction, DTO).withDecimals(this.configRepository.get(Coins.ConfigKey.CurrencyDecimals));
	}
}
