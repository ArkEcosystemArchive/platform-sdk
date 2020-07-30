import { DTO } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class HtlcLockData extends TransactionData implements DTO.DelegateRegistrationData {
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
