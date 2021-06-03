import { RawTransactionData, SignedTransactionData } from "../contracts";
import { Signatory } from "../signatories";

export interface TransactionService {
	__destruct(): Promise<void>;

	// Core
	transfer(input: TransferInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	secondSignature(input: SecondSignatureInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	delegateRegistration(
		input: DelegateRegistrationInput,
		options?: TransactionOptions,
	): Promise<SignedTransactionData>;
	vote(input: VoteInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	multiSignature(input: MultiSignatureInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	ipfs(input: IpfsInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	multiPayment(input: MultiPaymentInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	delegateResignation(input: DelegateResignationInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	htlcLock(input: HtlcLockInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	htlcClaim(input: HtlcClaimInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	htlcRefund(input: HtlcRefundInput, options?: TransactionOptions): Promise<SignedTransactionData>;

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
	contract?: {
		address: string;
	};
}

export interface TransactionOptions {
	unsignedBytes: boolean;
	unsignedJson: boolean;
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
};
