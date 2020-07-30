import { DTO } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class MultiPaymentData extends TransactionData implements DTO.MultiPaymentData {
	public payments(): { recipientId: string; amount: string }[] {
		return this.data.asset.payments;
	}
}
