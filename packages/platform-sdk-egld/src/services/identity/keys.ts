import { Contracts, Services } from "@arkecosystem/platform-sdk";

import { makeAccount } from "../helpers";

export class KeyPairService extends Services.AbstractKeyPairService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.KeyPairDataTransferObject> {
		const account = makeAccount();
		account.loadFromMnemonic(mnemonic);

		return {
			publicKey: account.publicKeyAsString(),
			privateKey: account.privateKeyAsString(),
		};
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPairDataTransferObject> {
		const account = makeAccount();
		account.loadFromHexPrivateKey(privateKey);

		return {
			publicKey: account.publicKeyAsString(),
			privateKey: account.privateKeyAsString(),
		};
	}
}
