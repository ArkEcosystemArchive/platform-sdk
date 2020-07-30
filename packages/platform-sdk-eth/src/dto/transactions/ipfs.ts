import { DTO, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class IpfsData extends TransactionData implements DTO.IpfsData {
	public hash(): string {
		throw new Exceptions.NotSupported(this.constructor.name, "hash");
	}
}
