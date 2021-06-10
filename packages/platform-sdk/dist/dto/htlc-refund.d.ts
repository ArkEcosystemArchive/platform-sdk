import { HtlcRefundData as Contract } from "./htlc-refund.contract";
import { AbstractTransactionData } from "./transaction";
export declare class HtlcRefundData extends AbstractTransactionData implements Contract {
	lockTransactionId(): string;
}
