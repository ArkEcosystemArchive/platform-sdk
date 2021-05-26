import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import StellarHDWallet from "stellar-hd-wallet";
import Stellar from "stellar-sdk";

export class KeyPairService implements Contracts.KeyPairService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.KeyPairDataTransferObject> {
		try {
			const source = StellarHDWallet.fromMnemonic(BIP39.normalize(mnemonic));

			return {
				publicKey: source.getPublicKey(options?.bip44?.account || 0),
				privateKey: source.getSecret(options?.bip44?.account || 0),
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

	public async fromWIF(wif: string): Promise<Contracts.KeyPairDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<Contracts.KeyPairDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
