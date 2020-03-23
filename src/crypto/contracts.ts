export interface Crypto {
	createTransfer(data: TransactionInput): object;
	createSecondSignature(data: TransactionInput): object;
	createDelegateRegistration(data: TransactionInput): object;
	createVote(data: TransactionInput): object;
	createMultiSignature(data: TransactionInput): object;
	createIpfs(data: TransactionInput): object;
	createMultiPayment(data: TransactionInput): object;
	createDelegateResignation(data: TransactionInput): object;
	createHtlcLock(data: TransactionInput): object;
	createHtlcClaim(data: TransactionInput): object;
	createHtlcRefund(data: TransactionInput): object;
}

export type TransactionInput = Record<string, any>;
