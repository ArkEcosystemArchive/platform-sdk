import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { privateToPublic } from "../../crypto";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PublicKeyDataTransferObject> {
		try {
			return { publicKey: privateToPublic(mnemonic) };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
