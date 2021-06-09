/* istanbul ignore file */

import { NotSupported } from "../exceptions";
import { injectable } from "../ioc";
import { DelegateRegistrationData as Contract } from "./delegate-registration.contract";
import { AbstractTransactionData } from "./transaction";

@injectable()
export class DelegateRegistrationData extends AbstractTransactionData implements Contract {
	public username(): string {
		throw new NotSupported(this.constructor.name, this.username.name);
	}
}
