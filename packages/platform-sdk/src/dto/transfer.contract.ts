import { TransactionData } from "./transaction.contract";

export interface TransferData extends TransactionData {
	memo(): string | undefined;
}
