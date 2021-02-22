import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
// @ts-ignore
import { BasicWallet } from "elrondjs";

export class Address implements Contracts.Address {
	public async fromMnemonic(mnemonic: string): Promise<string> {
		return BasicWallet.fromMnemonic(mnemonic).address();
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(publicKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPublicKey");
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async validate(address: string): Promise<boolean> {
		return true;
	}
}
