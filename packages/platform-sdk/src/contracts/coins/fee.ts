export interface TransactionFee {
	static: number;
	max: number;
	min: number;
	avg: number;
}

export interface TransactionFees {
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
	all(days: number): Promise<TransactionFees>;
}
