import { DTO } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class HtlcRefundData extends TransactionData implements DTO.HtlcRefundData {
	public lockTransactionId(): string {
		return this.data.asset.refund.lockTransactionId;
	}
}
