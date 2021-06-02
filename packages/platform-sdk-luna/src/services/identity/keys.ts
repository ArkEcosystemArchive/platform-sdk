import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { deriveKey } from "./helpers";

export class KeyPairService extends Services.AbstractKeyPairService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.KeyPairDataTransferObject> {
		try {
			const accountKey = deriveKey(mnemonic);

			return {
				publicKey: accountKey.publicKey!.toString("hex"),
				privateKey: accountKey.privateKey.toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
