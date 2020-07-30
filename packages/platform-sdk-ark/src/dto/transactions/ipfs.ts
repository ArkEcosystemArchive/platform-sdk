import { Contracts } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class IpfsData extends TransactionData implements Contracts.IpfsData {
	public hash(): string {
		return this.data.asset.ipfs;
	}
}
