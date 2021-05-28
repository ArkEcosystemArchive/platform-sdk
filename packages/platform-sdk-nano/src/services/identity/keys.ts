import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { deriveAccount } from "./helpers";

export class KeyPairService extends Services.AbstractKeyPairService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.KeyPairDataTransferObject> {
		try {
			const { publicKey, privateKey } = deriveAccount(mnemonic, options?.bip44?.account);

			return { publicKey, privateKey };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
