/* istanbul ignore file */

import { NotImplemented } from "../exceptions";
import { FeeService, TransactionFees } from "./fee.contract";

export abstract class AbstractFeeService implements FeeService {
	public async __destruct(): Promise<void> {
		//
	}

	public async all(): Promise<TransactionFees> {
		throw new NotImplemented(this.constructor.name, this.all.name);
	}
}
