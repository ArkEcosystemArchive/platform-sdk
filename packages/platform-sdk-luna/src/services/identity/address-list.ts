import { Contracts } from "@arkecosystem/platform-sdk";

export class AddressList implements Contracts.AddressList {
	public async fromMnemonic(mnemonic: string, pageSize: number): Promise<Contracts.AddressListEntry[]> {
		return [];
	}

	public async fromPrivateKey(privateKey: string, pageSize: number): Promise<Contracts.AddressListEntry[]> {
		return [];
	}
}
