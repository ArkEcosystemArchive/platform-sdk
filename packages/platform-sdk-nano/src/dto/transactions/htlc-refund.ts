import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class HtlcRefundData extends TransactionData implements Contracts.HtlcRefundData {
	public lockTransactionId(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "lockTransactionId");
	}
}
