import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PublicKeyDataTransferObject> {
		return {
			publicKey: BIP44.deriveChild(mnemonic, {
				coinType: this.#config.get(Coins.ConfigKey.Slip44),
				index: options?.bip44?.addressIndex,
			}).publicKey.toString("hex"),
			path: BIP44.stringify({
				coinType: this.#config.get(Coins.ConfigKey.Slip44),
				index: options?.bip44?.addressIndex,
			}),
		};
	}
}
