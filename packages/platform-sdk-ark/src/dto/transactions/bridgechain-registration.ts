import { Contracts } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class BridgechainRegistrationData extends TransactionData implements Contracts.BridgechainRegistrationData {
	public name(): string {
		return this.data.asset.bridgechainRegistration.name;
	}

	public seedNodes(): string[] {
		return this.data.asset.bridgechainRegistration.seedNodes;
	}

	public genesisHash(): string {
		return this.data.asset.bridgechainRegistration.genesisHash;
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
