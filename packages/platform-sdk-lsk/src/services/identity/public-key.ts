import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import * as cryptography from "@liskhq/lisk-cryptography";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PublicKeyDataTransferObject> {
		try {
			return {
				publicKey: cryptography.getPrivateAndPublicKeyFromPassphrase(mnemonic).publicKey,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
