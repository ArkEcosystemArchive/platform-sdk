import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { KeyValuePair } from "../types";
import { Entity } from "./entity";

export interface WalletBalance {
    total: BigNumber;
    available: BigNumber;
    fees: BigNumber;
    locked?: BigNumber;
    tokens?: Record<string, BigNumber>;
}

export interface WalletMultiSignature {
	min: number;
	publicKeys: string[];
	limit?: number;
}

export interface WalletData {
	// Wallet
	primaryKey(): string;

	address(): string;

	publicKey(): string | undefined;

	balance(): WalletBalance;

	nonce(): BigNumber;

	// Second Signature
	secondPublicKey(): string | undefined;

	// Delegate
	username(): string | undefined;

	rank(): number | undefined;

	votes(): BigNumber | undefined;

	multiSignature(): WalletMultiSignature;

	// Entities
	entities(): Entity[];

	// Flags
	isDelegate(): boolean;

	isResignedDelegate(): boolean;

	isMultiSignature(): boolean;

	isSecondSignature(): boolean;

	toObject(): KeyValuePair;

	hasPassed(): boolean;

	hasFailed(): boolean;
}

export interface PeerData {
	ip(): string;

	port(): number;

	version(): string;

	height(): number;

	latency(): number;

	toObject(): KeyValuePair;

	hasPassed(): boolean;

	hasFailed(): boolean;
}

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

export interface TransactionData {
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

	asset(): Record<string, unknown>;

	inputs(): UnspentTransactionData[];

	outputs(): UnspentTransactionData[];

	isConfirmed(): boolean;

	isSent(): boolean;

	isReceived(): boolean;

	isTransfer(): boolean;

	isSecondSignature(): boolean;

	isDelegateRegistration(): boolean;

	isVoteCombination(): boolean;

	isVote(): boolean;

	isUnvote(): boolean;

	isMultiSignature(): boolean;

	isIpfs(): boolean;

	isMultiPayment(): boolean;

	isDelegateResignation(): boolean;

	isHtlcLock(): boolean;

	isHtlcClaim(): boolean;

	isHtlcRefund(): boolean;

	isMagistrate(): boolean;

	toObject(): KeyValuePair;

	hasPassed(): boolean;

	hasFailed(): boolean;

	getMeta(key: string): TransactionDataMeta;

	setMeta(key: string, value: TransactionDataMeta): void;
}

export interface DelegateRegistrationData extends TransactionData {
	username(): string;
}

export interface DelegateResignationData extends TransactionData {}

export interface HtlcClaimData extends TransactionData {
	lockTransactionId(): string;

	unlockSecret(): string;
}

export interface HtlcLockData extends TransactionData {
	secretHash(): string;

	expirationType(): number;

	expirationValue(): number;
}

export interface HtlcRefundData extends TransactionData {
	lockTransactionId(): string;
}

export interface IpfsData extends TransactionData {
	hash(): string;
}

export interface MultiPaymentData extends TransactionData {
	memo(): string | undefined;
	payments(): { recipientId: string; amount: string }[];
}

export interface MultiSignatureData extends TransactionData {
	publicKeys(): string[];
	min(): number;
}

export interface SecondSignatureData extends TransactionData {
	secondPublicKey(): string;
}

export interface TransferData extends TransactionData {
	memo(): string | undefined;
}

export interface VoteData extends TransactionData {
	votes(): string[];
	unvotes(): string[];
}

export type TransactionDataType =
	| DelegateRegistrationData
	| DelegateResignationData
	| HtlcClaimData
	| HtlcLockData
	| HtlcRefundData
	| IpfsData
	| MultiPaymentData
	| MultiSignatureData
	| SecondSignatureData
	| TransferData
	| VoteData;

export type TransactionDataTypeCollection = TransactionDataType[];

export type RawTransactionData = any;

export interface SignedTransactionData {
	setAttributes(attributes: { identifier: string }): void;

	// All
	id(): string;
	data(): RawTransactionData;
	sender(): string;
	recipient(): string;
	amount(): BigNumber;
	fee(): BigNumber;

	// MultiSignature
	isMultiSignature(): boolean;
	isMultiSignatureRegistration(): boolean;

	// Helpers
	get<T = string>(key: string): T;
	toString(): string;
	toBroadcast(): any;
	toObject(): { id: string; sender: string; recipient: string; amount: string; data: any };
}
