import { KeyValuePair } from "../types";

// Some return objects, strings and objects so we want to avoid annoying type issues.
export type SignedTransaction = any;

export interface TransactionService {
	createTransfer(data: KeyValuePair): Promise<SignedTransaction>;
	createSecondSignature(data: KeyValuePair): Promise<SignedTransaction>;
	createDelegateRegistration(data: KeyValuePair): Promise<SignedTransaction>;
	createVote(data: KeyValuePair): Promise<SignedTransaction>;
	createMultiSignature(data: KeyValuePair): Promise<SignedTransaction>;
	createIpfs(data: KeyValuePair): Promise<SignedTransaction>;
	createMultiPayment(data: KeyValuePair): Promise<SignedTransaction>;
	createDelegateResignation(data: KeyValuePair): Promise<SignedTransaction>;
	createHtlcLock(data: KeyValuePair): Promise<SignedTransaction>;
	createHtlcClaim(data: KeyValuePair): Promise<SignedTransaction>;
	createHtlcRefund(data: KeyValuePair): Promise<SignedTransaction>;
}
