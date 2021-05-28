import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import TronWeb from "tronweb";

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
			address: TronWeb.address.fromPrivateKey(
				BIP44.deriveChild(mnemonic, {
					coinType: this.#config.get(Coins.ConfigKey.Slip44),
					index: options?.bip44?.addressIndex,
				}).privateKey!.toString("hex"),
			),
		};
	}

	public async validate(address: string): Promise<boolean> {
		return true;
	}
}
