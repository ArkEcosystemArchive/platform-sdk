import { Services } from "@arkecosystem/platform-sdk";
export declare class ExtendedAddressService extends Services.AbstractExtendedAddressService {
	#private;
	fromMnemonic(mnemonic: string, pageSize: number): Promise<Services.ExtendedAddressDataTransferObject[]>;
	fromPrivateKey(privateKey: string, pageSize: number): Promise<Services.ExtendedAddressDataTransferObject[]>;
}
