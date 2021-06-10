import { IdentityOptions } from "./shared.contract";

export interface WIFDataTransferObject {
	wif: string;
	path?: string;
}

export interface WIFService {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<WIFDataTransferObject>;
	fromPrivateKey(privateKey: string): Promise<WIFDataTransferObject>;
	fromSecret(secret: string): Promise<WIFDataTransferObject>;
}
