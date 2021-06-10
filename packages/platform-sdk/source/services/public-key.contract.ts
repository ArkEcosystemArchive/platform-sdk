import { IdentityOptions } from "./shared.contract";

export interface PublicKeyDataTransferObject {
	publicKey: string;
	path?: string;
}

export interface PublicKeyService {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<PublicKeyDataTransferObject>;
	fromMultiSignature(min: number, publicKeys: string[]): Promise<PublicKeyDataTransferObject>;
	fromWIF(wif: string): Promise<PublicKeyDataTransferObject>;
	fromSecret(secret: string): Promise<PublicKeyDataTransferObject>;
}
