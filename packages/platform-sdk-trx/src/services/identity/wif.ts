import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";

export class WIFService extends Services.AbstractWIFService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.WIFDataTransferObject> {
		try {
			return {
				wif: BIP44.deriveChild(mnemonic, {
					coinType: this.#config.get(Coins.ConfigKey.Slip44),
					index: options?.bip44?.addressIndex,
				}).toWIF(),
				path: BIP44.stringify({
					coinType: this.#config.get(Coins.ConfigKey.Slip44),
					index: options?.bip44?.addressIndex,
				}),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
