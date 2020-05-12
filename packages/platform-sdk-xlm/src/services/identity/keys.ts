import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import StellarHDWallet from "stellar-hd-wallet";
import Stellar from "stellar-sdk";

export class Keys implements Contracts.Keys {
	public async fromPassphrase(passphrase: string): Promise<Contracts.KeyPair> {
		const source = StellarHDWallet.fromMnemonic(passphrase);

		return {
			publicKey: source.getPublicKey(0),
			privateKey: source.getSecret(0),
		};
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPair> {
		const source = Stellar.Keypair.fromSecret(privateKey);

		return {
			publicKey: source.publicKey(),
			privateKey: source.secret(),
		};
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
