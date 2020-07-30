import { DTO, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class EntityRegistrationData extends TransactionData implements DTO.EntityRegistrationData {
	public entityType(): number {
		throw new Exceptions.NotSupported(this.constructor.name, "entityType");
	}

	public entitySubType(): number {
		throw new Exceptions.NotSupported(this.constructor.name, "entitySubType");
	}

	public entityAction(): number {
		throw new Exceptions.NotSupported(this.constructor.name, "entityAction");
	}

	public name(): string {
		throw new Exceptions.NotSupported(this.constructor.name, "name");
	}

	public ipfs(): string {
		throw new Exceptions.NotSupported(this.constructor.name, "ipfs");
	}
}
