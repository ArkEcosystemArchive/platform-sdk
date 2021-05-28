import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PrivateKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMnemonic");
	}
}
