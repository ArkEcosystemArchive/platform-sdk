import { DTO } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class IpfsData extends TransactionData implements DTO.IpfsData {
	public hash(): string {
		return this.data.asset.ipfs;
	}
}
