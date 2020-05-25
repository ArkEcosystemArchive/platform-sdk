import { Identities } from "@arkecosystem/crypto";
import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class Address implements Contracts.Address {
	public async fromPassphrase(passphrase: string): Promise<string> {
		return Identities.Address.fromPassphrase(passphrase);
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		return Identities.Address.fromMultiSignatureAsset({ min, publicKeys });
	}

	public async fromPublicKey(publicKey: string): Promise<string> {
		return Identities.Address.fromPublicKey(publicKey);
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<string> {
		return Identities.Address.fromWIF(wif);
	}

	public async validate(address: string): Promise<boolean> {
		return Identities.Address.validate(address);
	}
}
