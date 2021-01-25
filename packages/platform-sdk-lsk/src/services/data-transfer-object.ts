import { Coins, Contracts, Helpers } from "@arkecosystem/platform-sdk";

import * as DTO from "../dto";

export class DataTransferObjectService implements Contracts.DataTransferObjectService {
	public static async construct(config: Coins.Config): Promise<DataTransferObjectService> {
		return new DataTransferObjectService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public signedTransaction(identifier: string, signedData: string): Contracts.SignedTransactionData {
		return new DTO.SignedTransactionData(identifier, signedData);
	}

	public transaction(transaction: unknown): Contracts.TransactionDataType {
		return Helpers.createTransactionDataWithType(transaction, DTO);
	}
}
