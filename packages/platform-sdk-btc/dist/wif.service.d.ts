import { Services } from "@arkecosystem/platform-sdk";
export declare class WIFService extends Services.AbstractWIFService {
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.WIFDataTransferObject>;
}
