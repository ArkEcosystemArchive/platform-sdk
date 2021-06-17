import { Contracts, IoC } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { TransactionData } from "./transaction.dto";

@IoC.injectable()
export class MultiPaymentData extends TransactionData implements Contracts.MultiPaymentData {
	public override memo(): string | undefined {
		return this.data.vendorField;
	}

	public payments(): { recipientId: string; amount: BigNumber }[] {
		return this.data.asset.payments.map((payment: { recipientId: string; amount: BigNumber }) => ({
			address: payment.recipientId,
			amount: this.bigNumberService.make(payment.amount),
		}));
	}
}
