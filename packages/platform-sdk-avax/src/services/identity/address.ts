import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BinTools } from "avalanche";

import { keyPairFromMnemonic, useKeychain } from "../helpers";

export class AddressService extends Services.AbstractAddressService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		return {
			address: keyPairFromMnemonic(this.#config, mnemonic).getAddressString(),
		};
	}

	public async fromPrivateKey(
		privateKey: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		return {
			address: useKeychain(this.#config)
				.importKey(BinTools.getInstance().cb58Decode(privateKey))
				.getAddressString(),
		};
	}

	public async validate(address: string): Promise<boolean> {
		// @TODO: figure out some actual validation
		return true;
	}
}
