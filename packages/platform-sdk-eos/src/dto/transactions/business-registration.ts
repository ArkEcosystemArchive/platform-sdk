import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class BusinessRegistrationData extends TransactionData implements Contracts.BusinessRegistrationData {
	public name(): string {
		throw new Exceptions.NotSupported(this.constructor.name, "name");
	}

	public website(): string {
		throw new Exceptions.NotSupported(this.constructor.name, "website");
	}

	public vatId(): string {
		throw new Exceptions.NotSupported(this.constructor.name, "vatId");
	}

	public repository(): string {
		throw new Exceptions.NotSupported(this.constructor.name, "repository");
	}
}
