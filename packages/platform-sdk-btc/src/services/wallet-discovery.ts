import { Coins, Contracts, Services } from "@arkecosystem/platform-sdk";
import * as bitcoin from "bitcoinjs-lib";

import { AddressFactory } from "./identity/address.factory";

export class WalletDiscoveryService extends Services.AbstractWalletDiscoveryService {
	readonly #factory: AddressFactory;

	public constructor(config: Coins.Config) {
		super();

		this.#factory = new AddressFactory(
			config,
			config.get<Coins.NetworkManifest>("network").id.split(".")[1]
				? bitcoin.networks.bitcoin
				: bitcoin.networks.testnet,
		);
	}

	public static async __construct(config: Coins.Config): Promise<WalletDiscoveryService> {
		return new WalletDiscoveryService(config);
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject[]> {
		return Promise.all([
			this.#factory.bip44(mnemonic, options),
			this.#factory.bip49(mnemonic, options),
			this.#factory.bip84(mnemonic, options),
		]);
	}
}
