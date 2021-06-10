import { AbstractTransactionData } from "./transaction";
import { VoteData as Contract } from "./vote.contract";
export declare class VoteData extends AbstractTransactionData implements Contract {
	votes(): string[];
	unvotes(): string[];
}
