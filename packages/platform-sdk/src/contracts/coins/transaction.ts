// Some return objects, strings and objects so we want to avoid annoying type issues.
export type SignedTransaction = any;

export interface TransactionService {
	createTransfer(data: TransferInput): Promise<SignedTransaction>;
	createSecondSignature(data: SecondSignatureInput): Promise<SignedTransaction>;
	createDelegateRegistration(data: DelegateRegistrationInput): Promise<SignedTransaction>;
	createVote(data: VoteInput): Promise<SignedTransaction>;
	createMultiSignature(data: MultiSignatureInput): Promise<SignedTransaction>;
	createIpfs(data: IpfsInput): Promise<SignedTransaction>;
	createMultiPayment(data: MultiPaymentInput): Promise<SignedTransaction>;
	createDelegateResignation(data: DelegateResignationInput): Promise<SignedTransaction>;
	createHtlcLock(data: HtlcLockInput): Promise<SignedTransaction>;
	createHtlcClaim(data: HtlcClaimInput): Promise<SignedTransaction>;
	createHtlcRefund(data: HtlcRefundInput): Promise<SignedTransaction>;
}

// Transaction Signing
interface TransactionInput {
	fee?: string;
	feeLimit?: string;
	nonce?: string | number;
	sign: {
		passphrase: string;
		passphrases?: string[];
		secondPassphrase?: string;
		wif?: string;
		secondWif?: string;
	};
}

export interface TransferInput extends TransactionInput {
	data: {
		amount: string | number;
		from?: string;
		to: string;
		memo?: string;
	};
}

export interface SecondSignatureInput extends TransactionInput {
	data: { passphrase: string };
}

export interface DelegateRegistrationInput extends TransactionInput {
	data: { username: string };
}

export interface VoteInput extends TransactionInput {
	data: { vote: string };
}

export interface MultiSignatureInput extends TransactionInput {
	data: {
		publicKeys: string[];
		lifetime?: number;
		min: number;
		senderPublicKey?: string;
	};
}

export interface IpfsInput extends TransactionInput {
	data: { hash: string };
}

export interface MultiPaymentInput extends TransactionInput {
	data: {
		payments: { to: string; amount: string | number }[];
	};
}

export type DelegateResignationInput = TransactionInput;

export interface HtlcLockInput extends TransactionInput {
	data: {
		amount: string | number;
		to: string;
		secretHash: string;
		expiration: {
			type: number;
			value: number;
		};
	};
}

export interface HtlcClaimInput extends TransactionInput {
	data: {
		lockTransactionId: string;
		unlockSecret: string;
	};
}

export interface HtlcRefundInput extends TransactionInput {
	data: { lockTransactionId: string };
}
