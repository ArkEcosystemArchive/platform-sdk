import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { getPrivateAndPublicKeyFromPassphrase } from "@liskhq/lisk-cryptography";

@IoC.injectable()
export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		try {
			return {
				privateKey: getPrivateAndPublicKeyFromPassphrase(mnemonic).privateKey,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
