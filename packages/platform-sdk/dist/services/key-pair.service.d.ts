import { KeyPairDataTransferObject, KeyPairService } from "./key-pair.contract";
import { IdentityOptions } from "./shared.contract";
export declare class AbstractKeyPairService implements KeyPairService {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<KeyPairDataTransferObject>;
	fromPrivateKey(privateKey: string): Promise<KeyPairDataTransferObject>;
	fromWIF(wif: string): Promise<KeyPairDataTransferObject>;
	fromSecret(secret: string): Promise<KeyPairDataTransferObject>;
}
