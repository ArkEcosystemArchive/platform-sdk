import { Contracts, IoC } from "@arkecosystem/platform-sdk";

import { TransactionData } from "./transaction";

@IoC.injectable()
export class DelegateRegistrationData extends TransactionData implements Contracts.DelegateRegistrationData {
	public username(): string {
		return this.data.asset.delegate.username;
	}
}
