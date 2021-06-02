import { Coins, Contracts, Helpers, Services } from "@arkecosystem/platform-sdk";

import * as DTO from "../dto";

export class DataTransferObjectService extends Services.AbstractDataTransferObjectService {
	public static async __construct(config: Coins.Config): Promise<DataTransferObjectService> {
		return new DataTransferObjectService();
	}

	public signedTransaction(identifier: string, signedData: string): Contracts.SignedTransactionData {
		return new DTO.SignedTransactionData(identifier, signedData, signedData);
	}

	public transaction(transaction: unknown): Contracts.TransactionDataType {
		return Helpers.createTransactionDataWithType(transaction, DTO);
	}
}
