import { DTO, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class HtlcClaimData extends TransactionData implements DTO.HtlcClaimData {
	public lockTransactionId(): string {
		throw new Exceptions.NotSupported(this.constructor.name, "lockTransactionId");
	}

	public unlockSecret(): string {
		throw new Exceptions.NotSupported(this.constructor.name, "unlockSecret");
	}
}
