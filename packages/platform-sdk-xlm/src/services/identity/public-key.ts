import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { deriveKeyPair } from "./helpers";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PublicKeyDataTransferObject> {
		try {
			const { child, path } = deriveKeyPair(mnemonic, options);

			return {
				publicKey: child.publicKey(),
				path,
			}
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
