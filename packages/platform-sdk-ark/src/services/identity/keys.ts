import { Identities } from "@arkecosystem/crypto";
import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class Keys implements Contracts.Keys {
	public async fromMnemonic(mnemonic: string): Promise<Contracts.KeyPair> {
		const { publicKey, privateKey } = Identities.Keys.fromPassphrase(mnemonic, true);

		return { publicKey, privateKey };
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPair> {
		const { publicKey, privateKey } = Identities.Keys.fromWIF(wif);

		return { publicKey, privateKey };
	}
}
