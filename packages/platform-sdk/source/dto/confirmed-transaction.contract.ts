import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export interface MultiPaymentRecipient {
	address: string;
	amount: BigNumber;
}

// These types and interfaces are responsible for transaction-specific methods.
export type TransactionDataMeta = string | number | boolean | undefined;

export interface UnspentTransactionData {
	id(): string;

	timestamp(): DateTime;

	amount(): BigNumber;

	addresses(): string[];
}

export interface ConfirmedTransactionData {
	configure(data: any): ConfirmedTransactionData;

	withDecimals(decimals?: number | string): ConfirmedTransactionData;

	id(): string;

	blockId(): string | undefined;

	type(): string;

	timestamp(): DateTime | undefined;

	confirmations(): BigNumber;

	sender(): string;

	recipient(): string;

	recipients(): MultiPaymentRecipient[];

	amount(): BigNumber;

	fee(): BigNumber;

	memo(): string | undefined;

	asset(): Record<string, unknown>;

	inputs(): UnspentTransactionData[];

	outputs(): UnspentTransactionData[];

	isConfirmed(): boolean;

	isReturn(): boolean;

	isSent(): boolean;

	isReceived(): boolean;

	isTransfer(): boolean;

	isSecondSignature(): boolean;

	isDelegateRegistration(): boolean;

	isVoteCombination(): boolean;

	isVote(): boolean;

	isUnvote(): boolean;

	isMultiSignatureRegistration(): boolean;

	isIpfs(): boolean;

	isMultiPayment(): boolean;

	isDelegateResignation(): boolean;

	isHtlcLock(): boolean;

	isHtlcClaim(): boolean;

	isHtlcRefund(): boolean;

	isMagistrate(): boolean;

	// Second-Signature Registration
	secondPublicKey(): string;

	// Delegate Registration
	username(): string;

	// Vote
	votes(): string[];

	unvotes(): string[];

	// Multi-Signature Registration
	publicKeys(): string[];

	min(): number;

	// IPFS
	hash(): string;

	// Multi-Payment
	payments(): { recipientId: string; amount: BigNumber }[];

	// HTLC Claim / Refund
	lockTransactionId(): string;

	// HTLC Claim
	unlockSecret(): string;

	// HTLC Lock
	secretHash(): string;

	expirationType(): number;

	expirationValue(): number;

	toObject(): Record<string, any>;

	toJSON(): Record<string, any>;

	toHuman(): Record<string, any>;

	hasPassed(): boolean;

	hasFailed(): boolean;

	getMeta(key: string): TransactionDataMeta;

	setMeta(key: string, value: TransactionDataMeta): void;
}

export type ConfirmedTransactionDataCollection = ConfirmedTransactionData[];
