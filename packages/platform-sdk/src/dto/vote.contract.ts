import { TransactionData } from "./transaction.contract";

export interface VoteData extends TransactionData {
	votes(): string[];
	unvotes(): string[];
}
