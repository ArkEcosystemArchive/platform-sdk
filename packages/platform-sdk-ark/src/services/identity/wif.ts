import { WIF as BaseWIF } from "@arkecosystem/crypto-identities";
import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { CryptoConfig } from "../../contracts";

export class WIF implements Contracts.WIF {
	readonly #configCrypto: CryptoConfig;

	public constructor(configCrypto: CryptoConfig) {
		this.#configCrypto = configCrypto;
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
		try {
			return BaseWIF.fromPassphrase(mnemonic, this.#configCrypto);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
