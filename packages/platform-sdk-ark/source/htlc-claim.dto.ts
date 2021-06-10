import { Contracts, IoC } from "@arkecosystem/platform-sdk";

import { TransactionData } from "./transaction.dto";

@IoC.injectable()
export class HtlcClaimData extends TransactionData implements Contracts.HtlcClaimData {
	public lockTransactionId(): string {
		return this.data.asset.lock.lockTransactionId;
	}

	public unlockSecret(): string {
		return this.data.asset.lock.unlockSecret;
	}
}
