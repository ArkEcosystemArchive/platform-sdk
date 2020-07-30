import { DTO, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class VoteData extends TransactionData implements DTO.VoteData {
	public votes(): string[] {
		throw new Exceptions.NotSupported(this.constructor.name, "votes");
	}

	public unvotes(): string[] {
		throw new Exceptions.NotSupported(this.constructor.name, "unvotes");
	}
}
