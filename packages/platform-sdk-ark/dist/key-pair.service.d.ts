import { Services } from "@arkecosystem/platform-sdk";
export declare class KeyPairService extends Services.AbstractKeyPairService {
	private readonly config;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.KeyPairDataTransferObject>;
	fromWIF(wif: string): Promise<Services.KeyPairDataTransferObject>;
}
