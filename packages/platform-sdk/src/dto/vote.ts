/* istanbul ignore file */

import { NotImplemented } from "../exceptions";
import { injectable } from "../ioc";
import { AbstractTransactionData } from "./transaction";
import { VoteData as Contract } from "./vote.contract";

@injectable()
export class VoteData extends AbstractTransactionData implements Contract {
	public votes(): string[] {
		throw new NotImplemented(this.constructor.name, this.votes.name);
	}

	public unvotes(): string[] {
		throw new NotImplemented(this.constructor.name, this.unvotes.name);
	}
}
