import { Contracts } from "@arkecosystem/platform-sdk";
import { TransactionData } from "./transaction.dto";
export declare class DelegateRegistrationData extends TransactionData implements Contracts.DelegateRegistrationData {
	username(): string;
}
