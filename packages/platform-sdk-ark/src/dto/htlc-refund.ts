import { Contracts, IoC } from "@arkecosystem/platform-sdk";

import { TransactionData } from "./transaction";

@IoC.injectable()
export class HtlcRefundData extends TransactionData implements Contracts.HtlcRefundData {
	public lockTransactionId(): string {
		return this.data.asset.refund.lockTransactionId;
	}
}
