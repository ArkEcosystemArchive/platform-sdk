import { Services } from "@arkecosystem/platform-sdk";
export declare class WIFService extends Services.AbstractWIFService {
	private readonly config;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.WIFDataTransferObject>;
	fromPrivateKey(privateKey: string): Promise<Services.WIFDataTransferObject>;
}
