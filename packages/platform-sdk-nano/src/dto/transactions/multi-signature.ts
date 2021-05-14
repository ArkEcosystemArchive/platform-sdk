import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class MultiSignatureData extends TransactionData implements Contracts.MultiSignatureData {
	public publicKeys(): string[] {
		throw new Exceptions.NotImplemented(this.constructor.name, "publicKeys");
	}

	public min(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, "min");
	}
}
