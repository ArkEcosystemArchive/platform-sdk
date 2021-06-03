import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class VoteData extends TransactionData implements Contracts.VoteData {
	public votes(): string[] {
		throw new Exceptions.NotSupported(this.constructor.name, this.votes.name);
	}

	public unvotes(): string[] {
		throw new Exceptions.NotSupported(this.constructor.name, this.unvotes.name);
	}
}
