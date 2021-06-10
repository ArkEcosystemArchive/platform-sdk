import { ExtendedAddressDataTransferObject, ExtendedAddressService } from "./extended-address.contract";
export declare class AbstractExtendedAddressService implements ExtendedAddressService {
	fromMnemonic(mnemonic: string, pageSize: number): Promise<ExtendedAddressDataTransferObject[]>;
	fromPrivateKey(privateKey: string, pageSize: number): Promise<ExtendedAddressDataTransferObject[]>;
}
