import { Contracts } from "@arkecosystem/platform-sdk";
import { TransactionData } from "./transaction.dto";
export declare class VoteData extends TransactionData implements Contracts.VoteData {
	votes(): string[];
	unvotes(): string[];
}
