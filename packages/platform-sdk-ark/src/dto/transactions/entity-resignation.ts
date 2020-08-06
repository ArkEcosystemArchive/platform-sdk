import { Contracts } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class EntityResignationData extends TransactionData implements Contracts.EntityResignationData {
	public registrationId(): string {
		return this.data.asset.registrationId;
	}
}
