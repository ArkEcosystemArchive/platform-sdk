import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class MultiPaymentData extends TransactionData implements Contracts.MultiPaymentData {
	public memo(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.memo.name);
	}

	public payments(): { recipientId: string; amount: string }[] {
		throw new Exceptions.NotImplemented(this.constructor.name, this.payments.name);
	}
}
