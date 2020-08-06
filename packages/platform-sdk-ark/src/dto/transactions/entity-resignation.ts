import { Contracts } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class EntityResignationData extends TransactionData implements Contracts.EntityResignationData {
	public entityType(): number {
		return this.data.asset.type;
	}

	public entitySubType(): number {
		return this.data.asset.subType;
	}

	public entityAction(): number {
		return this.data.asset.action;
	}

	public registrationId(): string {
		return this.data.asset.registrationId;
	}
}
