// TODO: some return objects, strings and objects so we want to avoid annoying type issues.
export type SignedTransaction = any;

export interface TransactionService {
	destruct(): Promise<void>;

	// Core
	transfer(input: TransferInput, options?: TransactionOptions): Promise<SignedTransaction>;
	secondSignature(input: SecondSignatureInput, options?: TransactionOptions): Promise<SignedTransaction>;
	delegateRegistration(input: DelegateRegistrationInput, options?: TransactionOptions): Promise<SignedTransaction>;
	vote(input: VoteInput, options?: TransactionOptions): Promise<SignedTransaction>;
	multiSignature(input: MultiSignatureInput, options?: TransactionOptions): Promise<SignedTransaction>;
	ipfs(input: IpfsInput, options?: TransactionOptions): Promise<SignedTransaction>;
	multiPayment(input: MultiPaymentInput, options?: TransactionOptions): Promise<SignedTransaction>;
	delegateResignation(input: DelegateResignationInput, options?: TransactionOptions): Promise<SignedTransaction>;
	htlcLock(input: HtlcLockInput, options?: TransactionOptions): Promise<SignedTransaction>;
	htlcClaim(input: HtlcClaimInput, options?: TransactionOptions): Promise<SignedTransaction>;
	htlcRefund(input: HtlcRefundInput, options?: TransactionOptions): Promise<SignedTransaction>;

	// Magistrate
	entityRegistration(input: EntityRegistrationInput, options?: TransactionOptions): Promise<SignedTransaction>;
	entityResignation(input: EntityResignationInput, options?: TransactionOptions): Promise<SignedTransaction>;
	entityUpdate(input: EntityUpdateInput, options?: TransactionOptions): Promise<SignedTransaction>;
}

// Transaction Signing
export interface TransactionInput {
	fee?: string;
	feeLimit?: string;
	nonce?: string;
	sign: {
		mnemonic: string;
		mnemonics?: string[];
		secondMnemonic?: string;
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
		amount: string;
		from?: string;
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
