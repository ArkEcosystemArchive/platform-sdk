/* istanbul ignore file */

import { ConfigRepository } from "../coins";
import { SignedTransactionData, TransactionDataType } from "../contracts";
import { NotImplemented } from "../exceptions";
import { inject, injectable } from "../ioc";
import { BindingType } from "../ioc/service-provider.contract";
import { DataTransferObjectService } from "./data-transfer-object.contract";

@injectable()
export abstract class AbstractDataTransferObjectService implements DataTransferObjectService {
	@inject(BindingType.ConfigRepository)
	protected readonly configRepository!: ConfigRepository;

	public signedTransaction(identifier: string, signedData: string, broadcastData: any): SignedTransactionData {
		throw new NotImplemented(this.constructor.name, this.signedTransaction.name);
	}

	public transaction(transaction: unknown): TransactionDataType {
		throw new NotImplemented(this.constructor.name, this.transaction.name);
	}
}
