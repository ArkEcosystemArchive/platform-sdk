import { Contracts } from "@arkecosystem/platform-sdk";
import { TransactionData } from "./transaction.dto";
export declare class TransferData extends TransactionData implements Contracts.TransferData {
	memo(): string | undefined;
}
