import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { getPrivateAndPublicKeyFromPassphrase } from "@liskhq/lisk-cryptography";

@IoC.injectable()
export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		try {
			const { privateKey } = getPrivateAndPublicKeyFromPassphrase(mnemonic);

			return {
				privateKey: privateKey.slice(0, privateKey.length / 2),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
