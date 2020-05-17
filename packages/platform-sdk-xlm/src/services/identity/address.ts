import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import StellarHDWallet from "stellar-hd-wallet";
import Stellar from "stellar-sdk";

export class Address implements Contracts.Address {
	public async fromPassphrase(passphrase: string): Promise<string> {
		return StellarHDWallet.fromMnemonic(passphrase).getPublicKey(0);
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(publicKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPublicKey");
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		return Stellar.Keypair.fromSecret(privateKey).publicKey();
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
