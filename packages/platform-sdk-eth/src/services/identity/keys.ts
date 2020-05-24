import { Coins, Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";
import Wallet from "ethereumjs-wallet";

import { createWallet } from "./utils";

export class Keys implements Contracts.Keys {
	readonly #slip44;

	public constructor(slip44: number) {
		this.#slip44 = slip44;
	}

	public async fromPassphrase(passphrase: string): Promise<Contracts.KeyPair> {
		const wallet: Wallet = createWallet(passphrase, this.#slip44);

		return {
			publicKey: wallet.getPublicKey().toString("hex"),
			privateKey: wallet.getPrivateKey().toString("hex"),
		};
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPair> {
		const wallet: Wallet = Wallet.fromPrivateKey(Buffoon.fromHex(privateKey));

		return {
			publicKey: wallet.getPublicKey().toString("hex"),
			privateKey: wallet.getPrivateKey().toString("hex"),
		};
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
