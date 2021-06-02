import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

export class AddressService extends Services.AbstractAddressService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMnemonic");
	}

	public async validate(address: string): Promise<boolean> {
		return true;
	}
}
