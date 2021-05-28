import { Contracts, Services } from "@arkecosystem/platform-sdk";

export class ExtendedAddressService extends Services.AbstractExtendedAddressService {
	public async fromMnemonic(
		mnemonic: string,
		pageSize: number,
	): Promise<Contracts.ExtendedAddressDataTransferObject[]> {
		return [];
	}

	public async fromPrivateKey(
		privateKey: string,
		pageSize: number,
	): Promise<Contracts.ExtendedAddressDataTransferObject[]> {
		return [];
	}
}
