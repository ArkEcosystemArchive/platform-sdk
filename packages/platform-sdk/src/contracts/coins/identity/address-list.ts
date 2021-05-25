import { IdentityOptions } from "./shared"

export interface AddressListDataTransferObject {
	index: number;
	spendAddress: string;
	changeAddress: string;
	stakeAddress: string;
	used: boolean;
}

export interface AddressListService {
	fromMnemonic(mnemonic: string, pageSize: number): Promise<AddressListDataTransferObject[]>;
	fromPrivateKey(privateKey: string, pageSize: number): Promise<AddressListDataTransferObject[]>;
}
