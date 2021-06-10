import { TransactionData } from "./transaction.contract";

export interface HtlcLockData extends TransactionData {
	secretHash(): string;

	expirationType(): number;

	expirationValue(): number;
}
