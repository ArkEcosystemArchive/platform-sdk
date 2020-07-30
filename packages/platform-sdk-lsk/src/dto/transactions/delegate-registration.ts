import { DTO, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class DelegateRegistrationData extends TransactionData implements DTO.DelegateRegistrationData {
	public username(): string {
		throw new Exceptions.NotSupported(this.constructor.name, "username");
	}
}
