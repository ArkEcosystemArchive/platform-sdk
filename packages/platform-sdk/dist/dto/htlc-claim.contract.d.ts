import { TransactionData } from "./transaction.contract";
export interface HtlcClaimData extends TransactionData {
	lockTransactionId(): string;
	unlockSecret(): string;
}
