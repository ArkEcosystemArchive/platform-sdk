import { SecondSignatureData as Contract } from "./second-signature.contract";
import { AbstractTransactionData } from "./transaction";
export declare class SecondSignatureData extends AbstractTransactionData implements Contract {
	secondPublicKey(): string;
}
