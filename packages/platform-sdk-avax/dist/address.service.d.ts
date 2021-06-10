import { Coins, Services } from "@arkecosystem/platform-sdk";
export declare class AddressService extends Services.AbstractAddressService {
	protected readonly configRepository: Coins.ConfigRepository;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.AddressDataTransferObject>;
	fromPrivateKey(privateKey: string, options?: Services.IdentityOptions): Promise<Services.AddressDataTransferObject>;
	validate(address: string): Promise<boolean>;
}
