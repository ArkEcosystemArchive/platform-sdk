import { Contracts, Services } from "@arkecosystem/platform-sdk";

import { makeAccount } from "../helpers";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PublicKeyDataTransferObject> {
		const account = makeAccount();
		account.loadFromMnemonic(mnemonic);

		return { publicKey: account.publicKeyAsString() };
	}
}
