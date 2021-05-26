import { Contracts } from "@arkecosystem/platform-sdk";

export class ExtendedAddressService implements Contracts.ExtendedAddressService {
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
