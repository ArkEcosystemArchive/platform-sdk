import { TransactionData } from "./transaction.contract";
export interface MultiSignatureData extends TransactionData {
	publicKeys(): string[];
	min(): number;
}
