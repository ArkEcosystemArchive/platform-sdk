import { Contracts } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class HtlcClaimData extends TransactionData implements Contracts.HtlcClaimData {
	public lockTransactionId(): string {
		return this.data.asset.lock.lockTransactionId;
	}

	public unlockSecret(): string {
		return this.data.asset.lock.unlockSecret;
	}
}
