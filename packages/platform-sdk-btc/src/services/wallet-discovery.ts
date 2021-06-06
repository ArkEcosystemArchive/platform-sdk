import { Coins, Services } from "@arkecosystem/platform-sdk";

import { AddressFactory } from "./address.factory";

export class WalletDiscoveryService extends Services.AbstractWalletDiscoveryService {
	readonly #factory: AddressFactory;

	public constructor(config: Coins.ConfigRepository) {
		super();

		this.#factory = new AddressFactory(config);
	}

	public static async __construct(config: Coins.ConfigRepository): Promise<WalletDiscoveryService> {
		return new WalletDiscoveryService(config);
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject[]> {
		return Promise.all([
			this.#factory.bip44(mnemonic, options),
			this.#factory.bip49(mnemonic, options),
			this.#factory.bip84(mnemonic, options),
		]);
	}
}
