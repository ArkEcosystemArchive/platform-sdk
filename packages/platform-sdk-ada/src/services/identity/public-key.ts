import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { KeyPairService } from "./keys";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PublicKeyDataTransferObject> {
		try {
			return {
				publicKey: (await new KeyPairService().fromMnemonic(mnemonic, options)).publicKey,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
