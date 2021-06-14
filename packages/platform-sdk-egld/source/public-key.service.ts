import { IoC, Services } from "@arkecosystem/platform-sdk";

import { makeAccount } from "./factories";

@IoC.injectable()
export class PublicKeyService extends Services.AbstractPublicKeyService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		const account = makeAccount();
		account.loadFromMnemonic(mnemonic);

		return { publicKey: account.publicKeyAsString() };
	}
}
