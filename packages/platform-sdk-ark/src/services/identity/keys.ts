import { Keys as BaseKeys } from "@arkecosystem/crypto-identities";
import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { CryptoConfig } from "../../contracts";

export class KeyPairService implements Contracts.KeyPairService {
	readonly #configCrypto: CryptoConfig;

	public constructor(configCrypto: CryptoConfig) {
		this.#configCrypto = configCrypto;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.KeyPairDataTransferObject> {
		try {
			const { publicKey, privateKey } = BaseKeys.fromPassphrase(mnemonic, true);

			return { publicKey, privateKey };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPairDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPairDataTransferObject> {
		try {
			const { publicKey, privateKey } = BaseKeys.fromWIF(wif, this.#configCrypto);

			return { publicKey, privateKey };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromSecret(secret: string): Promise<Contracts.KeyPairDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
