import { IoC, Services } from "@arkecosystem/platform-sdk";

import { makeAccount } from "./helpers";

@IoC.injectable()
export class KeyPairService extends Services.AbstractKeyPairService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.KeyPairDataTransferObject> {
		const account = makeAccount();
		account.loadFromMnemonic(mnemonic);

		return {
			publicKey: account.publicKeyAsString(),
			privateKey: account.privateKeyAsString(),
		};
	}

	public async fromPrivateKey(privateKey: string): Promise<Services.KeyPairDataTransferObject> {
		const account = makeAccount();
		account.loadFromHexPrivateKey(privateKey);

		return {
			publicKey: account.publicKeyAsString(),
			privateKey: account.privateKeyAsString(),
		};
	}
}
