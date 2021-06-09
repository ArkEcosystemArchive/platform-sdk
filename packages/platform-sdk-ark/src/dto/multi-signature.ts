import { Contracts, IoC } from "@arkecosystem/platform-sdk";

import { TransactionData } from "./transaction";

@IoC.injectable()
export class MultiSignatureData extends TransactionData implements Contracts.MultiSignatureData {
	public publicKeys(): string[] {
		return this.data.asset.multiSignature.publicKeys;
	}

	public min(): number {
		return this.data.asset.multiSignature.min;
	}
}
