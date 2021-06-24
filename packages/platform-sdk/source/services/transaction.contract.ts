import { RawTransactionData, SignedTransactionData } from "../contracts";
import { Signatory } from "../signatories";

export interface TransactionService {
	// Core
	transfer(input: TransferInput): Promise<SignedTransactionData>;
	secondSignature(input: SecondSignatureInput): Promise<SignedTransactionData>;
	delegateRegistration(input: DelegateRegistrationInput): Promise<SignedTransactionData>;
	vote(input: VoteInput): Promise<SignedTransactionData>;
	multiSignature(input: MultiSignatureInput): Promise<SignedTransactionData>;
	ipfs(input: IpfsInput): Promise<SignedTransactionData>;
	multiPayment(input: MultiPaymentInput): Promise<SignedTransactionData>;
	delegateResignation(input: DelegateResignationInput): Promise<SignedTransactionData>;
	htlcLock(input: HtlcLockInput): Promise<SignedTransactionData>;
	htlcClaim(input: HtlcClaimInput): Promise<SignedTransactionData>;
	htlcRefund(input: HtlcRefundInput): Promise<SignedTransactionData>;

	// Multi-Signature
	multiSign(transaction: RawTransactionData, input: TransactionInputs): Promise<SignedTransactionData>;

	// Estimations
	estimateExpiration(value?: string): Promise<string | undefined>;
}

// Transaction Signing
export interface TransactionInput {
	fee?: number;
	feeLimit?: number;
	nonce?: string;
	signatory: Signatory;
	signatories?: Signatory[];
	contract?: {
		address: string;
	};
}

export interface TransferInput extends TransactionInput {
	data: {
		amount: number;
		to: string;
		memo?: string;
		expiration?: number;
	};
}

export interface SecondSignatureInput extends TransactionInput {
	data: { mnemonic: string };
}

export interface DelegateRegistrationInput extends TransactionInput {
	data: { username: string };
}

export interface VoteInput extends TransactionInput {
	data: { votes: string[]; unvotes: string[] };
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
		memo?: string;
		payments: { to: string; amount: number }[];
	};
}

export type DelegateResignationInput = TransactionInput;

export interface HtlcLockInput extends TransactionInput {
	data: {
		amount: number;
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

export interface EntityRegistrationInput extends TransactionInput {
	data: {
		type: number;
		subType: number;
		name: string;
		ipfs: string;
	};
}

export interface EntityResignationInput extends TransactionInput {
	data: {
		type: number;
		subType: number;
		registrationId: string;
	};
}

export interface EntityUpdateInput extends TransactionInput {
	data: {
		type: number;
		subType: number;
		registrationId: string;
		name?: string;
		ipfs?: string;
	};
}

export type TransactionInputs = Record<string, any> & {
	signatory: Signatory;
	signatories?: Signatory[];
};
