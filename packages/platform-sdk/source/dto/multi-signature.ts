/* istanbul ignore file */

import { NotImplemented } from "../exceptions";
import { injectable } from "../ioc";
import { MultiSignatureData as Contract } from "./multi-signature.contract";
import { AbstractTransactionData } from "./transaction";

@injectable()
export class MultiSignatureData extends AbstractTransactionData implements Contract {
	public publicKeys(): string[] {
		throw new NotImplemented(this.constructor.name, this.publicKeys.name);
	}

	public min(): number {
		throw new NotImplemented(this.constructor.name, this.min.name);
	}
}
