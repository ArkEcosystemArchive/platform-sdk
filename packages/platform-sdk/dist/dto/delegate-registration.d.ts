import { DelegateRegistrationData as Contract } from "./delegate-registration.contract";
import { AbstractTransactionData } from "./transaction";
export declare class DelegateRegistrationData extends AbstractTransactionData implements Contract {
	username(): string;
}
