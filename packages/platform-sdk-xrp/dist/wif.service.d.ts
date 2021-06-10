import { Coins, Services } from "@arkecosystem/platform-sdk";
export declare class WIFService extends Services.AbstractWIFService {
	protected readonly configRepository: Coins.ConfigRepository;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.WIFDataTransferObject>;
}
