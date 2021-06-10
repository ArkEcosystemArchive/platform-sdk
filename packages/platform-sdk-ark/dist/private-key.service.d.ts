import { Services } from "@arkecosystem/platform-sdk";
export declare class PrivateKeyService extends Services.AbstractPrivateKeyService {
	private readonly config;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.PrivateKeyDataTransferObject>;
	fromWIF(wif: string): Promise<Services.PrivateKeyDataTransferObject>;
}
