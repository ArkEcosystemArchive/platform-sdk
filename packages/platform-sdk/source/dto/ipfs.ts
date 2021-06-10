/* istanbul ignore file */

import { NotImplemented } from "../exceptions";
import { injectable } from "../ioc";
import { IpfsData as Contract } from "./ipfs.contract";
import { AbstractTransactionData } from "./transaction";

@injectable()
export class IpfsData extends AbstractTransactionData implements Contract {
	public hash(): string {
		throw new NotImplemented(this.constructor.name, this.hash.name);
	}
}
