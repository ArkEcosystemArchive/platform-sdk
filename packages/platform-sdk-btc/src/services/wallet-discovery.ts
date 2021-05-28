import { Coins, Contracts, Services } from "@arkecosystem/platform-sdk";
import Bitcoin from "bitcore-lib";

import { bip44, bip49, bip84 } from "./identity/utils";

export class WalletDiscoveryService extends Services.AbstractWalletDiscoveryService {
	readonly #network: Record<string, any>;

	public constructor(config: Coins.Config) {
		super();

		this.#network = Bitcoin.Networks[config.get<Coins.NetworkManifest>("network").id.split(".")[1]];
	}

	public static async __construct(config: Coins.Config): Promise<WalletDiscoveryService> {
		return new WalletDiscoveryService(config);
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject[]> {
		return Promise.all([
			bip44(mnemonic, this.#network.name, options),
			bip49(mnemonic, this.#network.name, options),
			bip84(mnemonic, options || {}),
		]);
	}
}
