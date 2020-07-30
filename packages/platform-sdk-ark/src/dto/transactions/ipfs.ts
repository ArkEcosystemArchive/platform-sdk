import { DTO } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class IpfsData extends TransactionData implements DTO.DelegateRegistrationData {
	public hash(): string {
		return this.data.asset.ipfs;
	}
}
