import { Contracts, IoC, Services } from "@arkecosystem/platform-sdk";

import { SignedTransactionData } from "../dto";

@IoC.injectable()
export class DataTransferObjectService extends Services.AbstractDataTransferObjectService {
	public signedTransaction(
		identifier: string,
		signedData: Contracts.RawTransactionData,
		broadcastData: any,
	): Contracts.SignedTransactionData {
		const signedTransaction = this.container.resolve(SignedTransactionData);
		signedTransaction.configure(identifier, signedData, broadcastData);

		return signedTransaction;
	}
}
