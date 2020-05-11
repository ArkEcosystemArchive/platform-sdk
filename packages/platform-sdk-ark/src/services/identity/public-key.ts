import { Identities } from "@arkecosystem/crypto";
import { Contracts } from "@arkecosystem/platform-sdk";

export class PublicKey implements Contracts.PublicKey {
	public async fromPassphrase(passphrase: string): Promise<string> {
		return Identities.PublicKey.fromPassphrase(passphrase);
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		return Identities.PublicKey.fromMultiSignatureAsset({ min, publicKeys });
	}

	public async fromWIF(wif: string): Promise<string> {
		return Identities.PublicKey.fromWIF(wif);
	}
}
