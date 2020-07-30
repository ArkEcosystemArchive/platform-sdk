import { Contracts } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class DelegateRegistrationData extends TransactionData implements Contracts.DelegateRegistrationData {
	public username(): string {
		return this.data.asset.delegate.username;
	}
}
