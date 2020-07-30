import { DTO } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class HtlcRefundData extends TransactionData implements DTO.DelegateRegistrationData {
	public lockTransactionId(): string {
		return this.data.asset.refund.lockTransactionId;
	}
}
