import { TransactionData } from "./transaction.contract";
export interface MultiPaymentData extends TransactionData {
	memo(): string | undefined;
	payments(): {
		recipientId: string;
		amount: string;
	}[];
}
