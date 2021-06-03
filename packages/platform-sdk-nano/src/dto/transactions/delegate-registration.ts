import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class DelegateRegistrationData extends TransactionData implements Contracts.DelegateRegistrationData {
	public username(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, this.username.name);
	}
}
