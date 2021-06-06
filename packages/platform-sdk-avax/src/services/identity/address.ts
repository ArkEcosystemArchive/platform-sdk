import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BinTools } from "avalanche";

import { keyPairFromMnemonic, useKeychain } from "../helpers";

export class AddressService extends Services.AbstractAddressService {
	readonly #config: Coins.ConfigRepository;

	public constructor(config: Coins.ConfigRepository) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		const { child, path } = keyPairFromMnemonic(this.#config, mnemonic, options);

		return {
			type: "bip44",
			address: child.getAddressString(),
			path,
		};
	}

	public async fromPrivateKey(
		privateKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		return {
			type: "bip44",
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
