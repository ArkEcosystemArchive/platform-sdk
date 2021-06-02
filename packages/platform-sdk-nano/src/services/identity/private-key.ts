import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { deriveAccount } from "./helpers";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		return {
			privateKey: deriveAccount(mnemonic, options?.bip44?.account).privateKey,
		};
	}
}
