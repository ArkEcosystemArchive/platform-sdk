import { Contracts } from "@arkecosystem/platform-sdk";
import { TransactionData } from "./transaction.dto";
export declare class SecondSignatureData extends TransactionData implements Contracts.SecondSignatureData {
	secondPublicKey(): string;
}
