import { WIF as BaseWIF } from "@arkecosystem/crypto-identities";
import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { CryptoConfig } from "../../contracts";

export class WIF implements Contracts.WIF {
	readonly #configCrypto: CryptoConfig;

	public constructor(configCrypto: CryptoConfig) {
		this.#configCrypto = configCrypto;
	}

	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		try {
			return BaseWIF.fromPassphrase(mnemonic, this.#configCrypto);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		try {
			// @ts-ignore - We don't care about having a public key for this
			return BaseWIF.fromKeys({ privateKey, compressed: true }, this.#configCrypto);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromSecret(secret: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
