import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class DataTransferObjectService implements Contracts.DataTransferObjectService {
	public static async __construct(config: Coins.Config): Promise<DataTransferObjectService> {
		return new DataTransferObjectService();
	}

	public async __destruct(): Promise<void> {
		//
	}

	public signedTransaction(identifier: string, signedData: string): Contracts.SignedTransactionData {
		throw new Exceptions.NotImplemented(this.constructor.name, "signedTransaction");
	}

	public transaction(transaction: unknown): Contracts.TransactionDataType {
		throw new Exceptions.NotImplemented(this.constructor.name, "transaction");
	}
}
