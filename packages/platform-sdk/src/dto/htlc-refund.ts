/* istanbul ignore file */

import { NotImplemented } from "../exceptions";
import { injectable } from "../ioc";
import { HtlcRefundData as Contract } from "./htlc-refund.contract";
import { AbstractTransactionData } from "./transaction";

@injectable()
export class HtlcRefundData extends AbstractTransactionData implements Contract {
	public lockTransactionId(): string {
		throw new NotImplemented(this.constructor.name, this.lockTransactionId.name);
	}
}
