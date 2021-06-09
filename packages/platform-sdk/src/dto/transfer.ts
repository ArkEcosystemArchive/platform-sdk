/* istanbul ignore file */

import { injectable } from "../ioc";
import { AbstractTransactionData } from "./transaction";
import { TransferData as Contract } from "./transfer.contract";

@injectable()
export class TransferData extends AbstractTransactionData implements Contract {
	public memo(): string | undefined {
		return undefined;
	}
}
