import { Identities } from "@arkecosystem/crypto";
import { Contracts } from "@arkecosystem/platform-sdk";

export class PublicKey implements Contracts.PublicKey {
	public async fromMnemonic(mnemonic: string): Promise<string> {
		return Identities.PublicKey.fromPassphrase(mnemonic);
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		return Identities.PublicKey.fromMultiSignatureAsset({ min, publicKeys });
	}

	public async fromWIF(wif: string): Promise<string> {
		return Identities.PublicKey.fromWIF(wif);
	}
}
