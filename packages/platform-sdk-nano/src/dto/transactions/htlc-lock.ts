import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class HtlcLockData extends TransactionData implements Contracts.HtlcLockData {
	public secretHash(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "secretHash");
	}

	public expirationType(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, "expirationType");
	}

	public expirationValue(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, "expirationValue");
	}
}
