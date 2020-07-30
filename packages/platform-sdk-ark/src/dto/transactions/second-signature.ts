import { DTO } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class SecondSignatureData extends TransactionData implements DTO.SecondSignatureData {
	public secondPublicKey(): string {
		return this.data.asset.signature.publicKey;
	}
}
