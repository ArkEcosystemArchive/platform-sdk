import { IdentityOptions } from "./shared"

export interface AddressDataTransferObject {
	address(): string;
	path(): string;
}

export interface AddressService {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<AddressDataTransferObject>;
	fromMultiSignature(min: number, publicKeys: string[]): Promise<AddressDataTransferObject>;
	fromPublicKey(publicKey: string, options?: IdentityOptions): Promise<AddressDataTransferObject>;
	fromPrivateKey(privateKey: string, options?: IdentityOptions): Promise<AddressDataTransferObject>;
	fromWIF(wif: string): Promise<AddressDataTransferObject>;
	fromSecret(secret: string): Promise<AddressDataTransferObject>;
	validate(address: string): Promise<boolean>;
}
