import { Services } from "@arkecosystem/platform-sdk";
export declare class PrivateKeyService extends Services.AbstractPrivateKeyService {
	private readonly wallet;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.PrivateKeyDataTransferObject>;
}
