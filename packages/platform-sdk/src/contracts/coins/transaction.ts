import { RawTransactionData, SignedTransactionData } from "./data";

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

	// Multi-Signature
	multiSign(transaction: RawTransactionData, input: TransactionInputs): Promise<SignedTransactionData>;

	// Estimations
	estimateExpiration(value?: string): Promise<string>;
}

// Transaction Signing
export interface TransactionInput {
	fee?: string;
	feeLimit?: string;
	nonce?: string;
	from: string;
	sign: {
		mnemonic?: string;
		mnemonics?: string[];
		secondMnemonic?: string;
		wif?: string;
		secondWif?: string;
		privateKey?: string;
		multiSignature?: {
			min: number;
			publicKeys: string[];
		};
		senderPublicKey?: string;
		signature?: string;
	};
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
		amount: string;
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
		payments: { to: string; amount: string }[];
	};
}

export type DelegateResignationInput = TransactionInput;

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

export type TransactionInputs = Record<string, any>;
