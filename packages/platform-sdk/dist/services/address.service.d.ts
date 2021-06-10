import { AddressDataTransferObject, AddressService } from "./address.contract";
import { IdentityOptions } from "./shared.contract";
export declare class AbstractAddressService implements AddressService {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<AddressDataTransferObject>;
	fromMultiSignature(min: number, publicKeys: string[]): Promise<AddressDataTransferObject>;
	fromPublicKey(publicKey: string, options?: IdentityOptions): Promise<AddressDataTransferObject>;
	fromPrivateKey(privateKey: string, options?: IdentityOptions): Promise<AddressDataTransferObject>;
	fromWIF(wif: string): Promise<AddressDataTransferObject>;
	fromSecret(secret: string): Promise<AddressDataTransferObject>;
	validate(address: string): Promise<boolean>;
}
