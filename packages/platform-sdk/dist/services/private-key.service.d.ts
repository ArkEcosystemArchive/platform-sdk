import { PrivateKeyDataTransferObject, PrivateKeyService } from "./private-key.contract";
import { IdentityOptions } from "./shared.contract";
export declare class AbstractPrivateKeyService implements PrivateKeyService {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<PrivateKeyDataTransferObject>;
	fromWIF(wif: string): Promise<PrivateKeyDataTransferObject>;
	fromSecret(secret: string): Promise<PrivateKeyDataTransferObject>;
}
