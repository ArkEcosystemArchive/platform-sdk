import { IdentityOptions } from "./shared.contract";
export interface PrivateKeyDataTransferObject {
	privateKey: string;
	path?: string;
}
export interface PrivateKeyService {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<PrivateKeyDataTransferObject>;
	fromWIF(wif: string): Promise<PrivateKeyDataTransferObject>;
	fromSecret(secret: string): Promise<PrivateKeyDataTransferObject>;
}
