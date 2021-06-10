import { Contracts, IoC } from "@arkecosystem/platform-sdk";

import { TransactionData } from "./transaction.dto";

@IoC.injectable()
export class TransferData extends TransactionData implements Contracts.TransferData {
	public memo(): string | undefined {
		return undefined;
	}
}
