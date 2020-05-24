import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import * as cryptography from "@liskhq/lisk-cryptography";

export class Keys implements Contracts.Keys {
	public async fromPassphrase(passphrase: string): Promise<Contracts.KeyPair> {
		const { publicKey, privateKey } = cryptography.getPrivateAndPublicKeyFromPassphrase(passphrase);

		return { publicKey, privateKey };
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
