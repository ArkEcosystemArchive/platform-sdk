import { MultiSignatureData as Contract } from "./multi-signature.contract";
import { AbstractTransactionData } from "./transaction";
export declare class MultiSignatureData extends AbstractTransactionData implements Contract {
	publicKeys(): string[];
	min(): number;
}
