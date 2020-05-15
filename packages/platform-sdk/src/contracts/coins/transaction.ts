// Some return objects, strings and objects so we want to avoid annoying type issues.
export type SignedTransaction = any;

export interface TransactionService {
	destruct(): Promise<void>;
	transfer(data: TransferInput): Promise<SignedTransaction>;
	secondSignature(data: SecondSignatureInput): Promise<SignedTransaction>;
	delegateRegistration(data: DelegateRegistrationInput): Promise<SignedTransaction>;
	vote(data: VoteInput): Promise<SignedTransaction>;
	multiSignature(data: MultiSignatureInput): Promise<SignedTransaction>;
	ipfs(data: IpfsInput): Promise<SignedTransaction>;
	multiPayment(data: MultiPaymentInput): Promise<SignedTransaction>;
	delegateResignation(data: DelegateResignationInput): Promise<SignedTransaction>;
	htlcLock(data: HtlcLockInput): Promise<SignedTransaction>;
	htlcClaim(data: HtlcClaimInput): Promise<SignedTransaction>;
	htlcRefund(data: HtlcRefundInput): Promise<SignedTransaction>;
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
		privateKey?: string;
	};
	contract?: {
		address: string;
	};
}

export interface TransactionOptions {
	unsignedJson: boolean;
	unsignedBytes: boolean;
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
