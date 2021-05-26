import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class WIFService implements Contracts.WIFService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.WIFDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMnemonic");
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.WIFDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromSecret(secret: string): Promise<Contracts.WIFDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
