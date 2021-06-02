import { IdentityOptions } from "./shared.contract";

export interface KeyPairDataTransferObject {
	publicKey: string;
	privateKey: string;
	path?: string;
}

export interface KeyPairService {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<KeyPairDataTransferObject>;
	fromPrivateKey(privateKey: string): Promise<KeyPairDataTransferObject>;
	fromWIF(wif: string): Promise<KeyPairDataTransferObject>;
	fromSecret(secret: string): Promise<KeyPairDataTransferObject>;
}
