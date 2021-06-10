import { Services } from "@arkecosystem/platform-sdk";
export declare class KeyPairService extends Services.AbstractKeyPairService {
	private readonly wallet;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.KeyPairDataTransferObject>;
	fromPrivateKey(privateKey: string): Promise<Services.KeyPairDataTransferObject>;
}
