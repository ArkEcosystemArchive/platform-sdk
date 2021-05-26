import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import * as cryptography from "@liskhq/lisk-cryptography";

export class PrivateKeyService implements Contracts.PrivateKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PrivateKeyDataTransferObject> {
		try {
			return {
				privateKey: cryptography.getPrivateAndPublicKeyFromPassphrase(mnemonic).privateKey,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<Contracts.PrivateKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<Contracts.PrivateKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
