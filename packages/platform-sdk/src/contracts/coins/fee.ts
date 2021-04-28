export interface TransactionFee {
	static: string;
	max: string;
	min: string;
	avg: string;
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
}

export interface FeeService {
	__destruct(): Promise<void>;

	all(): Promise<TransactionFees>;
}
