import { DTO, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class HtlcRefundData extends TransactionData implements DTO.HtlcRefundData {
	public lockTransactionId(): string {
		throw new Exceptions.NotSupported(this.constructor.name, "lockTransactionId");
	}
}
