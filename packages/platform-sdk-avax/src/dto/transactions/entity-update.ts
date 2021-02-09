import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class EntityUpdateData extends TransactionData implements Contracts.EntityUpdateData {
	public entityType(): number {
		throw new Exceptions.NotSupported(this.constructor.name, "entityType");
	}

	public entitySubType(): number {
		throw new Exceptions.NotSupported(this.constructor.name, "entitySubType");
	}

	public entityAction(): number {
		throw new Exceptions.NotSupported(this.constructor.name, "entityAction");
	}

	public name(): string | undefined {
		throw new Exceptions.NotSupported(this.constructor.name, "name");
	}

	public ipfs(): string | undefined {
		throw new Exceptions.NotSupported(this.constructor.name, "ipfs");
	}
}
