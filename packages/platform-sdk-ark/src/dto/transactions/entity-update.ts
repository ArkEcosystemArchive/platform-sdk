import { Contracts } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class EntityUpdateData extends TransactionData implements Contracts.EntityUpdateData {
	public entityType(): number {
		return this.data.asset.type;
	}

	public entitySubType(): number {
		return this.data.asset.subType;
	}

	public entityAction(): number {
		return this.data.asset.action;
	}

	public name(): string | undefined {
		return this.data.asset.data.name;
	}

	public ipfs(): string | undefined {
		return this.data.asset.data.ipfsData;
	}
}
