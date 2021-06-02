import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { privateToPublic } from "../../crypto";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		try {
			return { publicKey: privateToPublic(mnemonic) };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
