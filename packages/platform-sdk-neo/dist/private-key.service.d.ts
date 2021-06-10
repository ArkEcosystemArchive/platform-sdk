import { Coins, Services } from "@arkecosystem/platform-sdk";
export declare class PrivateKeyService extends Services.AbstractPrivateKeyService {
	protected readonly configRepository: Coins.ConfigRepository;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.PrivateKeyDataTransferObject>;
	fromWIF(wif: string): Promise<Services.PrivateKeyDataTransferObject>;
}
