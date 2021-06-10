import { HtlcLockData as Contract } from "./htlc-lock.contract";
import { AbstractTransactionData } from "./transaction";
export declare class HtlcLockData extends AbstractTransactionData implements Contract {
	secretHash(): string;
	expirationType(): number;
	expirationValue(): number;
}
