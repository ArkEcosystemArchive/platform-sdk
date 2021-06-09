import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";

@IoC.injectable()
export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, this.fromMnemonic.name);
	}
}
