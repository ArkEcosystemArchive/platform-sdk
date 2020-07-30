import { DTO, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class HtlcLockData extends TransactionData implements DTO.HtlcLockData {
	public secretHash(): string {
		throw new Exceptions.NotSupported(this.constructor.name, "secretHash");
	}

	public expirationType(): number {
		throw new Exceptions.NotSupported(this.constructor.name, "expirationType");
	}

	public expirationValue(): number {
		throw new Exceptions.NotSupported(this.constructor.name, "expirationValue");
	}
}
