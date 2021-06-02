import { Contracts, Services } from "@arkecosystem/platform-sdk";

import { makeAccount } from "../helpers";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		const account = makeAccount();
		account.loadFromMnemonic(mnemonic);

		return { privateKey: account.privateKeyAsString() };
	}
}
