import { Services } from "@arkecosystem/platform-sdk";
export declare class PublicKeyService extends Services.AbstractPublicKeyService {
	protected readonly privateKeyService: Services.PrivateKeyService;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.PublicKeyDataTransferObject>;
}
