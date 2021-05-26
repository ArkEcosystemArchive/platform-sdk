import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { makeAccount } from "../helpers";

export class PublicKeyService implements Contracts.PublicKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PublicKeyDataTransferObject> {
		const account = makeAccount();
		account.loadFromMnemonic(mnemonic);

		return { publicKey: account.publicKeyAsString() };
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<Contracts.PublicKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<Contracts.PublicKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<Contracts.PublicKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
