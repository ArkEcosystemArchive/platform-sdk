import { Contracts } from "@arkecosystem/platform-sdk";
import { TransactionData } from "./transaction.dto";
export declare class MultiPaymentData extends TransactionData implements Contracts.MultiPaymentData {
	memo(): string | undefined;
	payments(): {
		recipientId: string;
		amount: string;
	}[];
}
