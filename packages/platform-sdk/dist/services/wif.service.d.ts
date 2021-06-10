import { IdentityOptions } from "./shared.contract";
import { WIFDataTransferObject, WIFService } from "./wif.contract";
export declare class AbstractWIFService implements WIFService {
	fromMnemonic(mnemonic: string, options?: IdentityOptions): Promise<WIFDataTransferObject>;
	fromPrivateKey(privateKey: string): Promise<WIFDataTransferObject>;
	fromSecret(secret: string): Promise<WIFDataTransferObject>;
}
