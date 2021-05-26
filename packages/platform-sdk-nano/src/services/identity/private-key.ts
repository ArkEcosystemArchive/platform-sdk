import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { deriveAccountKey } from "./helpers";

export class PrivateKeyService implements Contracts.PrivateKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PrivateKeyDataTransferObject> {
		return {
			privateKey: deriveAccountKey(mnemonic, options?.bip44?.account || 0).privateKey,
		};
	}

	public async fromWIF(wif: string): Promise<Contracts.PrivateKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<Contracts.PrivateKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
