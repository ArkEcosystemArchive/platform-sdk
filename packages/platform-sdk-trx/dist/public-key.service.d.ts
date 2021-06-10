import { Coins, Services } from "@arkecosystem/platform-sdk";
export declare class PublicKeyService extends Services.AbstractPublicKeyService {
	protected readonly configRepository: Coins.ConfigRepository;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.PublicKeyDataTransferObject>;
}
