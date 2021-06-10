import { Contracts } from "@arkecosystem/platform-sdk";
import { TransactionData } from "./transaction.dto";
export declare class MultiSignatureData extends TransactionData implements Contracts.MultiSignatureData {
	publicKeys(): string[];
	min(): number;
}
