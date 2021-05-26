export interface ExtendedAddressDataTransferObject {
	index: number;
	spendAddress: string;
	changeAddress: string;
	stakeAddress: string;
	used: boolean;
}

export interface ExtendedAddressService {
	fromMnemonic(mnemonic: string, pageSize: number): Promise<ExtendedAddressDataTransferObject[]>;
	fromPrivateKey(privateKey: string, pageSize: number): Promise<ExtendedAddressDataTransferObject[]>;
}
