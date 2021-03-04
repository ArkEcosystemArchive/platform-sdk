import { Contracts } from "@arkecosystem/platform-sdk";

export class AddressList implements Contracts.AddressList {
	public make(mnemonic: string, pageSize: number): Contracts.AddressListEntry[] {
		return [];
	}
}
