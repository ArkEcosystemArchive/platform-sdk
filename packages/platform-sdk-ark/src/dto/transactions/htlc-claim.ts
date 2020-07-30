import { DTO } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class HtlcClaimData extends TransactionData implements DTO.HtlcClaimData {
	public lockTransactionId(): string {
		return this.data.asset.lock.lockTransactionId;
	}

	public unlockSecret(): string {
		return this.data.asset.lock.unlockSecret;
	}
}
