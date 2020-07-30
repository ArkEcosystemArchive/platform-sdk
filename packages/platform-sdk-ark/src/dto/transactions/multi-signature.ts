import { Contracts } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class MultiSignatureData extends TransactionData implements Contracts.MultiSignatureData {
	public publicKeys(): string[] {
		return this.data.asset.multiSignature.publicKeys;
	}

	public min(): number {
		return this.data.asset.multiSignature.min;
	}
}
