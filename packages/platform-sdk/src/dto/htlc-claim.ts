/* istanbul ignore file */

import { NotImplemented } from "../exceptions";
import { injectable } from "../ioc";
import { HtlcClaimData as Contract } from "./htlc-claim.contract";
import { AbstractTransactionData } from "./transaction";

@injectable()
export class HtlcClaimData extends AbstractTransactionData implements Contract {
	public lockTransactionId(): string {
		throw new NotImplemented(this.constructor.name, this.lockTransactionId.name);
	}

	public unlockSecret(): string {
		throw new NotImplemented(this.constructor.name, this.unlockSecret.name);
	}
}
