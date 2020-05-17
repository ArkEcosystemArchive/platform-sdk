import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { privateToPublic } from "eosjs-ecc";

export class PublicKey implements Contracts.PublicKey {
	public async fromPassphrase(passphrase: string): Promise<string> {
		return privateToPublic(passphrase);
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
