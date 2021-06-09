/* istanbul ignore file */

import { NotImplemented } from "../exceptions";
import { injectable } from "../ioc";
import { HtlcLockData as Contract } from "./htlc-lock.contract";
import { AbstractTransactionData } from "./transaction";

@injectable()
export class HtlcLockData extends AbstractTransactionData implements Contract {
	public secretHash(): string {
		throw new NotImplemented(this.constructor.name, this.secretHash.name);
	}

	public expirationType(): number {
		throw new NotImplemented(this.constructor.name, this.expirationType.name);
	}

	public expirationValue(): number {
		throw new NotImplemented(this.constructor.name, this.expirationValue.name);
	}
}
