import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import Stellar from "stellar-sdk";

import { deriveKeyPair } from "./helpers";

export class KeyPairService extends Services.AbstractKeyPairService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.KeyPairDataTransferObject> {
		try {
			const { child, path } = deriveKeyPair(mnemonic, options);

			return {
				publicKey: child.publicKey(),
				privateKey: child.secret(),
				path,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPairDataTransferObject> {
		try {
			const source = Stellar.Keypair.fromSecret(privateKey);

			return {
				publicKey: source.publicKey(),
				privateKey: source.secret(),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
