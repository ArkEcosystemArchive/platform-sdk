import { Services } from "@arkecosystem/platform-sdk";
export declare class KeyPairService extends Services.AbstractKeyPairService {
	#private;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.KeyPairDataTransferObject>;
	fromPrivateKey(privateKey: string): Promise<Services.KeyPairDataTransferObject>;
	fromWIF(wif: string): Promise<Services.KeyPairDataTransferObject>;
}
