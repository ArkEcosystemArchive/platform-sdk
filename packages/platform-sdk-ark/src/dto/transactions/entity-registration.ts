import { Contracts } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class EntityRegistrationData extends TransactionData implements Contracts.EntityRegistrationData {
	public entityType(): number {
		return this.data.asset.type;
	}

	public entitySubType(): number {
		return this.data.asset.subType;
	}

	public entityAction(): number {
		return this.data.asset.action;
	}

	public name(): string {
		return this.data.asset.data.name;
	}

	public ipfs(): string {
		return this.data.asset.data.ipfsData;
	}
}
