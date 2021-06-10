import { Services } from "@arkecosystem/platform-sdk";
export declare class PublicKeyService extends Services.AbstractPublicKeyService {
	#private;
	private readonly configRepository;
	private onPostConstruct;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.PublicKeyDataTransferObject>;
}
