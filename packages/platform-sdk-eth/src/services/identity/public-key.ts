import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { Buffoon } from "@arkecosystem/platform-sdk-crypto";
import Wallet from "ethereumjs-wallet";

import { PrivateKeyService } from "./private-key";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		try {
			const { privateKey } = await new PrivateKeyService(this.#config).fromMnemonic(mnemonic, options);
			const keyPair = Wallet.fromPrivateKey(Buffoon.fromHex(privateKey));

			return { publicKey: keyPair.getPublicKey().toString("hex") };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
