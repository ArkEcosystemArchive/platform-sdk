import { Contracts } from "@arkecosystem/platform-sdk";
import { TransactionData } from "./transaction.dto";
export declare class HtlcLockData extends TransactionData implements Contracts.HtlcLockData {
	secretHash(): string;
	expirationType(): number;
	expirationValue(): number;
}
