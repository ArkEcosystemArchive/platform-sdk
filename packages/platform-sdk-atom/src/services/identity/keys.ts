import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import { secp256k1 } from "bcrypto";

export class KeyPairService implements Contracts.KeyPairService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.KeyPairDataTransferObject> {
		try {
			const privateKey: Buffer | undefined = BIP44.deriveChild(mnemonic, {
				coinType: this.#config.get(Coins.ConfigKey.Slip44),
				index: options?.bip44?.addressIndex,
			}).privateKey;

			if (!privateKey) {
				throw new Error("Failed to derive private key.");
			}

			return {
				publicKey: secp256k1.publicKeyCreate(privateKey, true).toString("hex"),
				privateKey: privateKey.toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPairDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPairDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<Contracts.KeyPairDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
