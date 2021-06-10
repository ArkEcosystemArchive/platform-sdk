import { HtlcClaimData as Contract } from "./htlc-claim.contract";
import { AbstractTransactionData } from "./transaction";
export declare class HtlcClaimData extends AbstractTransactionData implements Contract {
	lockTransactionId(): string;
	unlockSecret(): string;
}
