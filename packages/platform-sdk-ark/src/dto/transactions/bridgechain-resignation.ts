import { Contracts } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class BridgechainResignationData extends TransactionData implements Contracts.BridgechainResignationData {
	public bridgechainId(): string {
		return this.data.asset.bridgechainResignation.bridgechainId;
	}
}
