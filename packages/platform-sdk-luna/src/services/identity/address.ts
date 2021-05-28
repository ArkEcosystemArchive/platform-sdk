import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { deriveKey } from "./helpers";

export class AddressService extends Services.AbstractAddressService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		return { address: deriveKey(mnemonic).accAddress };
	}

	public async validate(address: string): Promise<boolean> {
		return true;
	}
}
