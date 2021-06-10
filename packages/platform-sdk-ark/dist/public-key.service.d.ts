import { Services } from "@arkecosystem/platform-sdk";
export declare class PublicKeyService extends Services.AbstractPublicKeyService {
	private readonly config;
	fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Promise<Services.PublicKeyDataTransferObject>;
	fromMultiSignature(min: number, publicKeys: string[]): Promise<Services.PublicKeyDataTransferObject>;
	fromWIF(wif: string): Promise<Services.PublicKeyDataTransferObject>;
}
