import { Contracts, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { deriveAccount } from "./helpers";

@IoC.injectable()
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
