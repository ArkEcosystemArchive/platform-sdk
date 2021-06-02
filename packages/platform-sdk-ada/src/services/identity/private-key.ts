import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { KeyPairService } from "./keys";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		try {
			const { privateKey } = await new KeyPairService().fromMnemonic(mnemonic);

			if (!privateKey) {
				throw new Error("Failed to derive the private key.");
			}

			return { privateKey };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
