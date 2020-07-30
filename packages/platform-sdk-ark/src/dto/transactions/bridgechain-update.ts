import { Contracts } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class BridgechainUpdateData extends TransactionData implements Contracts.BridgechainUpdateData {
	public name(): string {
		return this.data.asset.bridgechainRegistration.name;
	}

	public seedNodes(): string[] {
		return this.data.asset.bridgechainRegistration.seedNodes;
	}

	public bridgechainRepository(): string {
		return this.data.asset.bridgechainRegistration.bridgechainRepository;
	}

	public bridgechainAssetRepository(): string {
		return this.data.asset.bridgechainRegistration.bridgechainAssetRepository;
	}

	public ports(): Record<string, number> {
		return this.data.asset.bridgechainRegistration.ports;
	}
}
