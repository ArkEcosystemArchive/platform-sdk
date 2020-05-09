import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import Wallet from "ethereumjs-wallet";

import { createWallet } from "./utils";

export class Keys implements Contracts.Keys {
	public async fromPassphrase(passphrase: string): Promise<Contracts.KeyPair> {
		const wallet: Wallet = createWallet(passphrase);

		return {
			publicKey: wallet.getPublicKey().toString("hex"),
			privateKey: wallet.getPrivateKey().toString("hex"),
		};
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPair> {
		const wallet: Wallet = Wallet.fromPrivateKey(Buffer.from(privateKey, "hex"));

		return {
			publicKey: wallet.getPublicKey().toString("hex"),
			privateKey: wallet.getPrivateKey().toString("hex"),
		};
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
