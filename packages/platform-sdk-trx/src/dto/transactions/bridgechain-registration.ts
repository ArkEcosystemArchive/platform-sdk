import { DTO, Exceptions } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class BridgechainRegistrationData extends TransactionData implements DTO.BridgechainRegistrationData {
	public name(): string {
		throw new Exceptions.NotSupported(this.constructor.name, "name");
	}

	public seedNodes(): string[] {
		throw new Exceptions.NotSupported(this.constructor.name, "seedNodes");
	}

	public genesisHash(): string {
		throw new Exceptions.NotSupported(this.constructor.name, "genesisHash");
	}

	public bridgechainRepository(): string {
		throw new Exceptions.NotSupported(this.constructor.name, "bridgechainRepository");
	}

	public bridgechainAssetRepository(): string {
		throw new Exceptions.NotSupported(this.constructor.name, "bridgechainAssetRepository");
	}

	public ports(): Record<string, number> {
		throw new Exceptions.NotSupported(this.constructor.name, "ports");
	}
}
