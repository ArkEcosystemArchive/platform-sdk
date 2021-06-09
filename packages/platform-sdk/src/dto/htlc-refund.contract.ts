import { TransactionData } from "./transaction.contract";

export interface HtlcRefundData extends TransactionData {
	lockTransactionId(): string;
}
