import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { createWallet, deriveWallet } from "./utils";

export class PublicKeyService implements Contracts.PublicKeyService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PublicKeyDataTransferObject> {
		try {
			return {
				publicKey: deriveWallet(
					mnemonic,
					this.#config.get<number>("network.constants.slip44"),
					options?.bip44?.account || 0,
					options?.bip44?.change || 0,
					options?.bip44?.addressIndex || 0,
				).publicKey,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<Contracts.PublicKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<Contracts.PublicKeyDataTransferObject> {
		try {
			return {
				publicKey: createWallet(wif).publicKey,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromSecret(secret: string): Promise<Contracts.PublicKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
