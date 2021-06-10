import { TransactionData } from "./transaction.contract";
export interface DelegateRegistrationData extends TransactionData {
	username(): string;
}
