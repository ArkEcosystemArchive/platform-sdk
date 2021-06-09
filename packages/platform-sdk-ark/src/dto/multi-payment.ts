import { Contracts, IoC } from "@arkecosystem/platform-sdk";

import { TransactionData } from "./transaction";

@IoC.injectable()
export class MultiPaymentData extends TransactionData implements Contracts.MultiPaymentData {
	public memo(): string | undefined {
		return this.data.vendorField;
	}

	public payments(): { recipientId: string; amount: string }[] {
		return this.data.asset.payments;
	}
}
