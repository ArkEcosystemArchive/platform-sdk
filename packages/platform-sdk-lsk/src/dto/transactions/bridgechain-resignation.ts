import { DTO, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class BridgechainResignationData extends TransactionData implements DTO.BridgechainResignationData {
	public bridgechainId(): string {
		throw new Exceptions.NotSupported(this.constructor.name, "bridgechainId");
	}
}
