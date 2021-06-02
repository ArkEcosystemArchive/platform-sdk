import { Contracts, Services } from "@arkecosystem/platform-sdk";

import { makeAccount } from "../helpers";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		const account = makeAccount();
		account.loadFromMnemonic(mnemonic);

		return { publicKey: account.publicKeyAsString() };
	}
}
