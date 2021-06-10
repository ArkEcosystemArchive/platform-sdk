import { Contracts, IoC } from "@arkecosystem/platform-sdk";

import { TransactionData } from "./transaction.dto";

@IoC.injectable()
export class IpfsData extends TransactionData implements Contracts.IpfsData {
	public hash(): string {
		return this.data.asset.ipfs;
	}
}
