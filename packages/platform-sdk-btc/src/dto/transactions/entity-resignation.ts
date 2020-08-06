import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class EntityResignationData extends TransactionData implements Contracts.EntityResignationData {
	public entityType(): number {
		throw new Exceptions.NotSupported(this.constructor.name, "entityType");
	}

	public entitySubType(): number {
		throw new Exceptions.NotSupported(this.constructor.name, "entitySubType");
	}

	public entityAction(): number {
		throw new Exceptions.NotSupported(this.constructor.name, "entityAction");
	}

	public registrationId(): string {
		throw new Exceptions.NotSupported(this.constructor.name, "registrationId");
	}
}
