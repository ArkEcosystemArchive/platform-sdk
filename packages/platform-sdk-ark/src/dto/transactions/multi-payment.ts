import { DTO } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class MultiPaymentData extends TransactionData implements DTO.DelegateRegistrationData {
	public payments(): { recipientId: string; amount: string }[] {
		return this.data.asset.payments;
	}
}
