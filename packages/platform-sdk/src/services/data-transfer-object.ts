import { DataTransferObjectService, SignedTransactionData, TransactionDataType } from "../contracts";
import { NotImplemented } from "../exceptions";

export abstract class AbstractDataTransferObjectService implements DataTransferObjectService {
	public async __destruct(): Promise<void> {
		//
	}

	public signedTransaction(identifier: string, signedData: string): SignedTransactionData {
		throw new NotImplemented(this.constructor.name, this.signedTransaction.name);
	}

	public transaction(transaction: unknown): TransactionDataType {
		throw new NotImplemented(this.constructor.name, this.transaction.name);
	}
}
