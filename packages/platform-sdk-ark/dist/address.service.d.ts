import { Services } from "@arkecosystem/platform-sdk";
export declare class AddressService extends Services.AbstractAddressService {
	private readonly config;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.AddressDataTransferObject>;
	fromMultiSignature(min: number, publicKeys: string[]): Promise<Services.AddressDataTransferObject>;
	fromPublicKey(publicKey: string, options?: Services.IdentityOptions): Promise<Services.AddressDataTransferObject>;
	fromPrivateKey(privateKey: string, options?: Services.IdentityOptions): Promise<Services.AddressDataTransferObject>;
	fromWIF(wif: string): Promise<Services.AddressDataTransferObject>;
	validate(address: string): Promise<boolean>;
}
