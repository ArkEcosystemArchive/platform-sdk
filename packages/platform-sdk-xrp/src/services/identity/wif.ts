import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";

export class WIFService extends Services.AbstractWIFService {
	readonly #config: Coins.ConfigRepository;

	public constructor(config: Coins.ConfigRepository) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.WIFDataTransferObject> {
		const { child, path } = BIP44.deriveChildWithPath(mnemonic, {
			coinType: this.#config.get(Coins.ConfigKey.Slip44),
			index: options?.bip44?.addressIndex,
		});

		try {
			return {
				wif: child.toWIF(),
				path,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
