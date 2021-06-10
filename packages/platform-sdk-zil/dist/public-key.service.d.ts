import { Services } from "@arkecosystem/platform-sdk";
export declare class PublicKeyService extends Services.AbstractPublicKeyService {
	private readonly wallet;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.PublicKeyDataTransferObject>;
}
