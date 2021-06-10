import { MultiPaymentData as Contract } from "./multi-payment.contract";
import { AbstractTransactionData } from "./transaction";
export declare class MultiPaymentData extends AbstractTransactionData implements Contract {
	memo(): string | undefined;
	payments(): {
		recipientId: string;
		amount: string;
	}[];
}
