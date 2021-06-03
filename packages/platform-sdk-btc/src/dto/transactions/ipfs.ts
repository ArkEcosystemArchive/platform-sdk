import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class IpfsData extends TransactionData implements Contracts.IpfsData {
	public hash(): string {
		throw new Exceptions.NotSupported(this.constructor.name, this.hash.name);
	}
}
