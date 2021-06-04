import { Keys as BaseKeys } from "@arkecosystem/crypto-identities";
import { Exceptions, Services } from "@arkecosystem/platform-sdk";

import { CryptoConfig } from "../../contracts";

export class KeyPairService extends Services.AbstractKeyPairService {
	readonly #config: CryptoConfig;

	public constructor(config: CryptoConfig) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.KeyPairDataTransferObject> {
		try {
			const { publicKey, privateKey } = BaseKeys.fromPassphrase(mnemonic, true);

			return { publicKey, privateKey };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<Services.KeyPairDataTransferObject> {
		try {
			const { publicKey, privateKey } = BaseKeys.fromWIF(wif, this.#config);

			return { publicKey, privateKey };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
