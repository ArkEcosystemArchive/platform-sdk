import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import { deriveKeypair } from "ripple-keypairs";

export class KeyPairService extends Services.AbstractKeyPairService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.KeyPairDataTransferObject> {
		const { publicKey, privateKey } = BIP44.deriveChild(mnemonic, {
			coinType: this.#config.get(Coins.ConfigKey.Slip44),
			index: options?.bip44?.addressIndex,
		});

		return {
			publicKey: publicKey.toString("hex"),
			privateKey: privateKey!.toString("hex"),
		};
	}

	public async fromSecret(secret: string): Promise<Contracts.KeyPairDataTransferObject> {
		try {
			return deriveKeypair(secret);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
