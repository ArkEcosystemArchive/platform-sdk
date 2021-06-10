import { Contracts } from "@arkecosystem/platform-sdk";
import { TransactionData } from "./transaction.dto";
export declare class HtlcClaimData extends TransactionData implements Contracts.HtlcClaimData {
	lockTransactionId(): string;
	unlockSecret(): string;
}
