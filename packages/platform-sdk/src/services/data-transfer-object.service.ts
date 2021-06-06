/* istanbul ignore file */

import { ConfigRepository } from "../coins";
import { SignedTransactionData, TransactionDataType } from "../contracts";
import { NotImplemented } from "../exceptions";
import { BindingType, inject, injectable } from "../ioc";
import { DataTransferObjectService } from "./data-transfer-object.contract";

@injectable()
export abstract class AbstractDataTransferObjectService implements DataTransferObjectService {
	@inject(BindingType.ConfigRepository)
	protected readonly configRepository!: ConfigRepository;

	public signedTransaction(identifier: string, signedData: string): SignedTransactionData {
		throw new NotImplemented(this.constructor.name, this.signedTransaction.name);
	}

	public transaction(transaction: unknown): TransactionDataType {
		throw new NotImplemented(this.constructor.name, this.transaction.name);
	}
}
