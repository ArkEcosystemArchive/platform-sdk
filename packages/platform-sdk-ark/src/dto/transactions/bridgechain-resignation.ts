import { DTO } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class BridgechainResignationData extends TransactionData implements DTO.DelegateRegistrationData {
	public bridgechainId(): string {
		return this.data.asset.bridgechainResignation.bridgechainId;
	}
}
