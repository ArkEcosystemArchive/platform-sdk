import { Contracts, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import * as cryptography from "@liskhq/lisk-cryptography";

@IoC.injectable()
export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		try {
			return {
				privateKey: cryptography.getPrivateAndPublicKeyFromPassphrase(mnemonic).privateKey,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
