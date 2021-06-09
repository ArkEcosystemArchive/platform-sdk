/* istanbul ignore file */

import { NotImplemented } from "../exceptions";
import { injectable } from "../ioc";
import { MultiPaymentData as Contract } from "./multi-payment.contract";
import { AbstractTransactionData } from "./transaction";

@injectable()
export class MultiPaymentData extends AbstractTransactionData implements Contract {
	public memo(): string | undefined {
		throw new NotImplemented(this.constructor.name, this.memo.name);
	}

	public payments(): { recipientId: string; amount: string }[] {
		throw new NotImplemented(this.constructor.name, this.payments.name);
	}
}
