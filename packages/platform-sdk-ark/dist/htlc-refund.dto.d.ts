import { Contracts } from "@arkecosystem/platform-sdk";
import { TransactionData } from "./transaction.dto";
export declare class HtlcRefundData extends TransactionData implements Contracts.HtlcRefundData {
	lockTransactionId(): string;
}
