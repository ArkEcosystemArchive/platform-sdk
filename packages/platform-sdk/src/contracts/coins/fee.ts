import { BigNumber } from "@arkecosystem/platform-sdk-support";

export interface TransactionFee {
	static: string;
	max: string;
	min: string;
	avg: string;
}

export interface TransactionFees {
	// Core
	transfer: TransactionFee;
	secondSignature: TransactionFee;
	delegateRegistration: TransactionFee;
	vote: TransactionFee;
	multiSignature: TransactionFee;
	ipfs: TransactionFee;
	multiPayment: TransactionFee;
	delegateResignation: TransactionFee;
	htlcLock: TransactionFee;
	htlcClaim: TransactionFee;
	htlcRefund: TransactionFee;
}

export interface FeeService {
	__destruct(): Promise<void>;

	all(days: number): Promise<TransactionFees>;
	estimate(transaction: any, speed: "slow" | "average" | "fast"): Promise<BigNumber>;
}
