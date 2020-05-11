import { Contracts } from "@arkecosystem/platform-sdk";

import { deriveKeyPair, deriveWallet } from "./utils";

export class Keys implements Contracts.Keys {
	public async fromPassphrase(passphrase: string): Promise<Contracts.KeyPair> {
		const { publicKey, privateKey } = deriveWallet(passphrase);

		return { publicKey, privateKey };
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPair> {
		return deriveKeyPair(privateKey);
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPair> {
		return deriveKeyPair(wif);
	}
}
