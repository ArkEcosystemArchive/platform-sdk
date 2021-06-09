import { TransactionData } from "./transaction.contract";

export interface SecondSignatureData extends TransactionData {
	secondPublicKey(): string;
}
