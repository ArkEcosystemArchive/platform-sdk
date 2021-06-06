import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import { secp256k1 } from "bcrypto";

export class KeyPairService extends Services.AbstractKeyPairService {
	readonly #config: Coins.ConfigRepository;

	public constructor(config: Coins.ConfigRepository) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.KeyPairDataTransferObject> {
		try {
			const { child, path } = BIP44.deriveChildWithPath(mnemonic, {
				coinType: this.#config.get(Coins.ConfigKey.Slip44),
				index: options?.bip44?.addressIndex,
			});

			if (!child.privateKey) {
				throw new Error("Failed to derive private key.");
			}

			return {
				publicKey: secp256k1.publicKeyCreate(child.privateKey, true).toString("hex"),
				privateKey: child.privateKey.toString("hex"),
				path,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
