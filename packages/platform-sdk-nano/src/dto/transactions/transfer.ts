import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class TransferData extends TransactionData implements Contracts.TransferData {
	public memo(): string | undefined {
		return undefined;
	}
}
