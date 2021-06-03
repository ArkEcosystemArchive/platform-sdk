import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class HtlcLockData extends TransactionData implements Contracts.HtlcLockData {
	public secretHash(): string {
		throw new Exceptions.NotSupported(this.constructor.name, this.secretHash.name);
	}

	public expirationType(): number {
		throw new Exceptions.NotSupported(this.constructor.name, this.expirationType.name);
	}

	public expirationValue(): number {
		throw new Exceptions.NotSupported(this.constructor.name, this.expirationValue.name);
	}
}
