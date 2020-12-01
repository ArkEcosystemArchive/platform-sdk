import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { addressFromMnemonic } from "../../crypto/shelley/address";

export class Address implements Contracts.Address {
	public async fromMnemonic(mnemonic: string): Promise<string> {
		const networkId = 0; // 0: testnet, 1: mainnet

		return addressFromMnemonic(mnemonic, 0, false, 0, networkId);
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
		throw new Exceptions.NotSupported(this.constructor.name, "validate");
	}
}
