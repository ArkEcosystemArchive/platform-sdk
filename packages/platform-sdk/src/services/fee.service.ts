/* istanbul ignore file */

import { FeeService, TransactionFees } from "../contracts";
import { NotImplemented } from "../exceptions";

export abstract class AbstractFeeService implements FeeService {
	public async __destruct(): Promise<void> {
		//
	}

	public async all(): Promise<TransactionFees> {
		throw new NotImplemented(this.constructor.name, this.all.name);
	}
}
