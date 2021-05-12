import { PrivateKey as BasePrivateKey } from "@arkecosystem/crypto-identities";
import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { CryptoConfig } from "../../contracts";

export class PrivateKey implements Contracts.PrivateKey {
	readonly #configCrypto: CryptoConfig;

	public constructor(configCrypto: CryptoConfig) {
		this.#configCrypto = configCrypto;
	}

	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		try {
			return BasePrivateKey.fromPassphrase(mnemonic);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<string> {
		try {
			return BasePrivateKey.fromWIF(wif, this.#configCrypto);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromSecret(secret: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
