import { Contracts, IoC } from "@arkecosystem/platform-sdk";

import { TransactionData } from "./transaction.dto";

@IoC.injectable()
export class HtlcLockData extends TransactionData implements Contracts.HtlcLockData {
	public secretHash(): string {
		return this.data.asset.lock.secretHash;
	}

	public expirationType(): number {
		return this.data.asset.lock.expiration.type;
	}

	public expirationValue(): number {
		return this.data.asset.lock.expiration.value;
	}
}
