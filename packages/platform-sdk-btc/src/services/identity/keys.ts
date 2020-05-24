import { Contracts } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-support";
import { PrivateKey, PublicKey } from "bitcore-lib";

export class Keys implements Contracts.Keys {
	public async fromPassphrase(passphrase: string): Promise<Contracts.KeyPair> {
		return this.normalize(new PrivateKey(BIP44.deriveMasterKey(passphrase).privateKey!.toString("hex")));
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPair> {
		return this.normalize(new PrivateKey(privateKey));
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPair> {
		return this.normalize(PrivateKey.fromWIF(wif));
	}

	private normalize(privateKey: Buffer): Contracts.KeyPair {
		return {
			publicKey: PublicKey.fromPrivateKey(privateKey).toString("hex"),
			privateKey: privateKey.toString("hex"),
		};
	}
}
