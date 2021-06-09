import { Contracts, IoC } from "@arkecosystem/platform-sdk";

import { TransactionData } from "./transaction";

@IoC.injectable()
export class TransferData extends TransactionData implements Contracts.TransferData {
	public memo(): string | undefined {
		return undefined;
	}
}
