import { Coins, Contracts, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";

import * as DTO from "../dto";

@IoC.injectable()
export class DataTransferObjectService extends Services.AbstractDataTransferObjectService {
	public signedTransaction(
		identifier: string,
		signedData: Contracts.RawTransactionData,
		broadcastData: any,
	): Contracts.SignedTransactionData {
		const signedTransaction = this.container.resolve(DTO.SignedTransactionData)
		signedTransaction.configure(identifier, signedData, broadcastData, this.configRepository.get(Coins.ConfigKey.CurrencyDecimals));

		return signedTransaction;
	}
}
