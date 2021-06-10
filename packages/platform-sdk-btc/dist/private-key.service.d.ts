import { Services } from "@arkecosystem/platform-sdk";
export declare class PrivateKeyService extends Services.AbstractPrivateKeyService {
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.PrivateKeyDataTransferObject>;
	fromWIF(wif: string): Promise<Services.PrivateKeyDataTransferObject>;
}
