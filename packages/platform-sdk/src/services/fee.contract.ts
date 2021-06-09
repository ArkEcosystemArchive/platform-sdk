import { BigNumber } from "@arkecosystem/platform-sdk-support";

export interface TransactionFee {
	static: BigNumber;
	max: BigNumber;
	min: BigNumber;
	avg: BigNumber;
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
	all(): Promise<TransactionFees>;
}
