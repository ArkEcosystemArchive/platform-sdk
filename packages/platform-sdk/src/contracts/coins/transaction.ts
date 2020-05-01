// Some return objects, strings and objects so we want to avoid annoying type issues.
export type SignedTransaction = any;

export interface TransactionService {
	transfer(input: TransferInput): Promise<SignedTransaction>;
	secondSignature(input: SecondSignatureInput): Promise<SignedTransaction>;
	delegateRegistration(input: DelegateRegistrationInput): Promise<SignedTransaction>;
	vote(input: VoteInput): Promise<SignedTransaction>;
	multiSignature(input: MultiSignatureInput): Promise<SignedTransaction>;
	ipfs(input: IpfsInput): Promise<SignedTransaction>;
	multiPayment(input: MultiPaymentInput): Promise<SignedTransaction>;
	delegateResignation(input: DelegateResignationInput): Promise<SignedTransaction>;
	htlcLock(input: HtlcLockInput): Promise<SignedTransaction>;
	htlcClaim(input: HtlcClaimInput): Promise<SignedTransaction>;
	htlcRefund(input: HtlcRefundInput): Promise<SignedTransaction>;
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
