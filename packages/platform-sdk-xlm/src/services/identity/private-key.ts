import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import StellarHDWallet from "stellar-hd-wallet";

export class PrivateKey implements Contracts.PrivateKey {
	public async fromMnemonic(mnemonic: string): Promise<string> {
		return StellarHDWallet.fromMnemonic(mnemonic).getSecret(0);
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
