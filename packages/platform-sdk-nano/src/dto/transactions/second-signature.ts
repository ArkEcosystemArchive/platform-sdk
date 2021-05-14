import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class SecondSignatureData extends TransactionData implements Contracts.SecondSignatureData {
	public secondPublicKey(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "secondPublicKey");
	}
}
