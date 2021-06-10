import { Coins, Services } from "@arkecosystem/platform-sdk";
import { AddressFactory } from "./address.factory";
export declare class AddressService extends Services.AbstractAddressService {
	#private;
	protected readonly configRepository: Coins.ConfigRepository;
	protected readonly addressFactory: AddressFactory;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.AddressDataTransferObject>;
	fromMultiSignature(min: number, publicKeys: string[]): Promise<Services.AddressDataTransferObject>;
	fromPublicKey(publicKey: string, options?: Services.IdentityOptions): Promise<Services.AddressDataTransferObject>;
	fromPrivateKey(privateKey: string, options?: Services.IdentityOptions): Promise<Services.AddressDataTransferObject>;
	fromWIF(wif: string): Promise<Services.AddressDataTransferObject>;
	validate(address: string): Promise<boolean>;
	private onPostConstruct;
}
