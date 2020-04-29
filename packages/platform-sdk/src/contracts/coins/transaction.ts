import { KeyValuePair } from "../types";

export interface TransactionService {
	createTransfer(data: KeyValuePair): object;
	createSecondSignature(data: KeyValuePair): object;
	createDelegateRegistration(data: KeyValuePair): object;
	createVote(data: KeyValuePair): object;
	createMultiSignature(data: KeyValuePair): object;
	createIpfs(data: KeyValuePair): object;
	createMultiPayment(data: KeyValuePair): object;
	createDelegateResignation(data: KeyValuePair): object;
	createHtlcLock(data: KeyValuePair): object;
	createHtlcClaim(data: KeyValuePair): object;
	createHtlcRefund(data: KeyValuePair): object;
}

export type SignedTransaction = string | object;
