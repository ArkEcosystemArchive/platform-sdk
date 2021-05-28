import { WIF as BaseWIF } from "@arkecosystem/crypto-identities";
import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { CryptoConfig } from "../../contracts";

export class WIFService extends Services.AbstractWIFService {
	readonly #config: CryptoConfig;

	public constructor(config: CryptoConfig) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.WIFDataTransferObject> {
		try {
			return {
				wif: BaseWIF.fromPassphrase(mnemonic, this.#config),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.WIFDataTransferObject> {
		try {
			return {
				// @ts-ignore - We don't care about having a public key for this
				wif: BaseWIF.fromKeys({ privateKey, compressed: true }, this.#config),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
