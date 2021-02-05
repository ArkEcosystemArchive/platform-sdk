import { Coins, Contracts, Helpers } from "@arkecosystem/platform-sdk";

import * as DTO from "../dto";

export class DataTransferObjectService implements Contracts.DataTransferObjectService {
	public static async __construct(config: Coins.Config): Promise<DataTransferObjectService> {
		return new DataTransferObjectService();
	}

	public async __destruct(): Promise<void> {
		//
	}

	public signedTransaction(identifier: string, signedData: string): Contracts.SignedTransactionData {
		return new DTO.SignedTransactionData(identifier, signedData, signedData);
	}

	public transaction(transaction: unknown): Contracts.TransactionDataType {
		return Helpers.createTransactionDataWithType(transaction, DTO);
	}
}
