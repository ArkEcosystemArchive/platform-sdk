import { TransactionData } from "./transaction.contract";
export interface IpfsData extends TransactionData {
	hash(): string;
}
