import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";
import Wallet from "ethereumjs-wallet";

import { createWallet, getAddress } from "./utils";

export class Address implements Contracts.Address {
	public async fromPassphrase(passphrase: string): Promise<string> {
		return getAddress(createWallet(passphrase));
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(publicKey: string): Promise<string> {
		return getAddress(Wallet.fromPublicKey(Utils.Buffoon.fromHex(publicKey)));
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		return getAddress(Wallet.fromPrivateKey(Utils.Buffoon.fromHex(privateKey)));
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
