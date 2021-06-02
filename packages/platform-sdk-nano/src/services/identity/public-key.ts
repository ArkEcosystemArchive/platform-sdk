import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { deriveAccount } from "./helpers";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		return {
			publicKey: deriveAccount(mnemonic, options?.bip44?.account).publicKey,
		};
	}
}
