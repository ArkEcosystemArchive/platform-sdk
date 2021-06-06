import { Coins, Contracts, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";

import * as DTO from "../dto";

@IoC.injectable()
export class DataTransferObjectService extends Services.AbstractDataTransferObjectService {
	public signedTransaction(identifier: string, signedData: string): Contracts.SignedTransactionData {
		return new DTO.SignedTransactionData(identifier, signedData, signedData, this.configRepository.get(Coins.ConfigKey.CurrencyDecimals));
	}

	public transaction(transaction: Contracts.KeyValuePair): Contracts.TransactionDataType {
		return Helpers.createTransactionDataWithType(transaction, DTO).withDecimals(this.configRepository.get(Coins.ConfigKey.CurrencyDecimals));
	}
}
