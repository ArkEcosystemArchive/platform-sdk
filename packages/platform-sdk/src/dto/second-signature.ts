/* istanbul ignore file */

import { NotImplemented } from "../exceptions";
import { injectable } from "../ioc";
import { SecondSignatureData as Contract } from "./second-signature.contract";
import { AbstractTransactionData } from "./transaction";

@injectable()
export class SecondSignatureData extends AbstractTransactionData implements Contract {
	public secondPublicKey(): string {
		throw new NotImplemented(this.constructor.name, this.secondPublicKey.name);
	}
}
