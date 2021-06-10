import { Services } from "@arkecosystem/platform-sdk";
export declare class AddressService extends Services.AbstractAddressService {
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.AddressDataTransferObject>;
	fromPublicKey(publicKey: string, options?: Services.IdentityOptions): Promise<Services.AddressDataTransferObject>;
	fromPrivateKey(privateKey: string, options?: Services.IdentityOptions): Promise<Services.AddressDataTransferObject>;
	validate(address: string): Promise<boolean>;
}
