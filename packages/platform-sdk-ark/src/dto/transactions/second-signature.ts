import { Contracts } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class SecondSignatureData extends TransactionData implements Contracts.SecondSignatureData {
	public secondPublicKey(): string {
		return this.data.asset.signature.publicKey;
	}
}
