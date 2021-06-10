import { Coins, Services } from "@arkecosystem/platform-sdk";
export declare class PrivateKeyService extends Services.AbstractPrivateKeyService {
	protected readonly configRepository: Coins.ConfigRepository;
	protected readonly keyPairService: Services.KeyPairService;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.PrivateKeyDataTransferObject>;
}
