import { PublicKeyDataTransferObject, PublicKeyService } from "./public-key.contract";
import { IdentityOptions } from "./shared.contract";
export declare class AbstractPublicKeyService implements PublicKeyService {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<PublicKeyDataTransferObject>;
	fromMultiSignature(min: number, publicKeys: string[]): Promise<PublicKeyDataTransferObject>;
	fromWIF(wif: string): Promise<PublicKeyDataTransferObject>;
	fromSecret(secret: string): Promise<PublicKeyDataTransferObject>;
}
