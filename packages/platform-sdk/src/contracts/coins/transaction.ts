import { SignedTransactionData } from "./data";

export interface TransactionService {
	destruct(): Promise<void>;

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

	// Magistrate
	entityRegistration(input: EntityRegistrationInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	entityResignation(input: EntityResignationInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	entityUpdate(input: EntityUpdateInput, options?: TransactionOptions): Promise<SignedTransactionData>;
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
	};
}

export interface SecondSignatureInput extends TransactionInput {
	data: { mnemonic: string };
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
		payments: { to: string; amount: string }[];
	};
}

export type DelegateResignationInput = TransactionInput;

export interface HtlcLockInput extends TransactionInput {
	data: {
		amount: string;
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
		type: "business" | "bridgechain" | "developer" | "plugin" | "delegate";
		subType?: "pluginCore" | "pluginDesktop";
		name?: string;
		ipfs?: string;
	};
}

export interface EntityResignationInput extends TransactionInput {
	data: {
		type: "business" | "bridgechain" | "developer" | "plugin" | "delegate";
		subType?: "pluginCore" | "pluginDesktop";
		registrationId: string;
	};
}

export interface EntityUpdateInput extends TransactionInput {
	data: {
		type: "business" | "bridgechain" | "developer" | "plugin" | "delegate";
		subType?: "pluginCore" | "pluginDesktop";
		registrationId: string;
		name?: string;
		ipfs?: string;
	};
}

export type TransactionInputs = Record<string, any>;
