import { Contracts } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class BusinessUpdateData extends TransactionData implements Contracts.BusinessUpdateData {
	public name(): string {
		return this.data.asset.businessRegistration.name;
	}

	public website(): string {
		return this.data.asset.businessRegistration.website;
	}

	public vatId(): string {
		return this.data.asset.businessRegistration.vat;
	}

	public repository(): string {
		return this.data.asset.businessRegistration.repository;
	}
}
