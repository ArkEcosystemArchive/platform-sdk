import { Services } from "@arkecosystem/platform-sdk";
export declare class AddressService extends Services.AbstractAddressService {
	private readonly wallet;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.AddressDataTransferObject>;
	fromPrivateKey(privateKey: string, options?: Services.IdentityOptions): Promise<Services.AddressDataTransferObject>;
	validate(address: string): Promise<boolean>;
}
