import { Coins, Services } from "@arkecosystem/platform-sdk";
export declare class AddressFactory {
	#private;
	protected readonly configRepository: Coins.ConfigRepository;
	private onPostConstruct;
	bip44(mnemonic: string, options?: Services.IdentityOptions): Services.AddressDataTransferObject;
	bip49(mnemonic: string, options?: Services.IdentityOptions): Services.AddressDataTransferObject;
	bip84(mnemonic: string, options?: Services.IdentityOptions): Services.AddressDataTransferObject;
}
