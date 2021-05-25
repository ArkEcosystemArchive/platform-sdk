import { IdentityOptions } from "./shared";

export interface ExtendedAddressDataTransferObject {
	index: number;
	spendAddress: string;
	changeAddress: string;
	stakeAddress: string;
	used: boolean;
}

export interface AddressListService {
	fromMnemonic(mnemonic: string, pageSize: number): Promise<ExtendedAddressDataTransferObject[]>;
	fromPrivateKey(privateKey: string, pageSize: number): Promise<ExtendedAddressDataTransferObject[]>;
}
