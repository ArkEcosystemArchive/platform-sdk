import { Services } from "@arkecosystem/platform-sdk";
export declare class KeyPairService extends Services.AbstractKeyPairService {
	#private;
	private readonly configRepository;
	private onPostConstruct;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.KeyPairDataTransferObject>;
	fromPrivateKey(privateKey: string): Promise<Services.KeyPairDataTransferObject>;
}
