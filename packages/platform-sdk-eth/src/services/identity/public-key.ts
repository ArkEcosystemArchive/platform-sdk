import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Buffoon } from "@arkecosystem/platform-sdk-crypto";
import Wallet from "ethereumjs-wallet";

import { PrivateKeyService } from "./private-key";

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
			const { privateKey } = await new PrivateKeyService(this.#config).fromMnemonic(mnemonic, options);
			const keyPair = Wallet.fromPrivateKey(Buffoon.fromHex(privateKey));

			return { publicKey: keyPair.getPublicKey().toString("hex") };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<Contracts.PublicKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<Contracts.PublicKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<Contracts.PublicKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
