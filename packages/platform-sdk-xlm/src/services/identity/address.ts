import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import StellarHDWallet from "stellar-hd-wallet";
import Stellar from "stellar-sdk";

export class Address implements Contracts.Address {
	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		try {
			return StellarHDWallet.fromMnemonic(mnemonic).getPublicKey(options?.bip44?.account || 0);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(publicKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPublicKey");
	}

	public async fromPrivateKey(privateKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		try {
			return Stellar.Keypair.fromSecret(privateKey).publicKey();
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}

	public async validate(address: string): Promise<boolean> {
		return true;
	}
}
