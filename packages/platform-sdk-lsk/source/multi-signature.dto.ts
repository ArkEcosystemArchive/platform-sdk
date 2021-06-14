import { Contracts, IoC } from "@arkecosystem/platform-sdk";

import { TransactionData } from "./transaction.dto";

@IoC.injectable()
export class MultiSignatureData extends TransactionData implements Contracts.MultiSignatureData {
	public publicKeys(): string[] {
		return this.data.asset.multisignature.keysgroup;
	}

	public min(): number {
		return this.data.asset.multisignature.min;
	}
}
