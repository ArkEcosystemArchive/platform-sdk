import { IoC, Services } from "@arkecosystem/platform-sdk";

import { deriveAccount } from "./account";

@IoC.injectable()
export class PublicKeyService extends Services.AbstractPublicKeyService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		return {
			publicKey: deriveAccount(mnemonic, options?.bip44?.account).publicKey,
		};
	}
}
