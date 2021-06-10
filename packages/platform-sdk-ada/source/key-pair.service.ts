import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";

import { deriveAccountKey, deriveRootKey } from "./shelley";

@IoC.injectable()
export class KeyPairService extends Services.AbstractKeyPairService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.KeyPairDataTransferObject> {
		try {
			let rootKey = deriveRootKey(mnemonic);

			if (options?.bip44?.account !== undefined) {
				rootKey = deriveAccountKey(rootKey, options.bip44.account);
			}

			return {
				publicKey: Buffer.from(rootKey.to_public().as_bytes()).toString("hex"),
				privateKey: Buffer.from(rootKey.to_raw_key().as_bytes()).toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
