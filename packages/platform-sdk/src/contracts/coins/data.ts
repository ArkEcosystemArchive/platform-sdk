import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { KeyValuePair } from "../types";

export interface WalletData {
	// Wallet
	address(): string;

	publicKey(): string | undefined;

	balance(): BigNumber;

	nonce(): BigNumber;

	// Delegate
	username(): string | undefined;

	rank(): number | undefined;

	votes(): BigNumber | undefined;

	// Flags
	isDelegate(): boolean;

	isKnown(): boolean;

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

export interface TransactionData {
	id(): string;

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

	isConfirmed(): boolean;

	isSent(): boolean;

	isReceived(): boolean;

	isTransfer(): boolean;

	isSecondSignature(): boolean;

	isDelegateRegistration(): boolean;

	isVote(): boolean;

	isUnvote(): boolean;

	isMultiSignature(): boolean;

	isIpfs(): boolean;

	isMultiPayment(): boolean;

	isDelegateResignation(): boolean;

	isHtlcLock(): boolean;

	isHtlcClaim(): boolean;

	isHtlcRefund(): boolean;

	isBusinessRegistration(): boolean;

	isBusinessResignation(): boolean;

	isBusinessUpdate(): boolean;

	isBridgechainRegistration(): boolean;

	isBridgechainResignation(): boolean;

	isBridgechainUpdate(): boolean;

	isEntityRegistration(): boolean;

	isEntityResignation(): boolean;

	isEntityUpdate(): boolean;

	toObject(): KeyValuePair;

	hasPassed(): boolean;

	hasFailed(): boolean;

	getMeta(key: string): TransactionDataMeta;

	setMeta(key: string, value: TransactionDataMeta): void;
}

export interface BridgechainRegistrationData extends TransactionData {
	name(): string;

	seedNodes(): string[];

	genesisHash(): string;

	bridgechainRepository(): string;

	bridgechainAssetRepository(): string;

	ports(): Record<string, number>;
}

export interface BridgechainResignationData extends TransactionData {
	bridgechainId(): string;
}

export interface BridgechainUpdateData extends TransactionData {
	name(): string;

	seedNodes(): string[];

	bridgechainRepository(): string;

	bridgechainAssetRepository(): string;

	ports(): Record<string, number>;
}

export interface BusinessRegistrationData extends TransactionData {
	name(): string;

	website(): string;

	vatId(): string;

	repository(): string;
}

export interface BusinessResignationData extends TransactionData {}

export interface BusinessUpdateData extends TransactionData {
	name(): string;

	website(): string;

	vatId(): string;

	repository(): string;
}

export interface DelegateRegistrationData extends TransactionData {
	username(): string;
}

export interface DelegateResignationData extends TransactionData {}

export interface EntityRegistrationData extends TransactionData {
	entityType(): number;

	entitySubType(): number;

	entityAction(): number;

	name(): string;

	ipfs(): string;
}

export interface EntityResignationData extends TransactionData {}

export interface EntityUpdateData extends TransactionData {
	entityType(): number;

	entitySubType(): number;

	entityAction(): number;

	ipfs(): string;
}

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
	payments(): { recipientId: string; amount: string }[];
}

export interface MultiSignatureData extends TransactionData {
	publicKeys(): string[];
	min(): number;
}

export interface SecondSignatureData extends TransactionData {
	secondPublicKey(): string;
}

export interface TransferData extends TransactionData {}

export interface VoteData extends TransactionData {
	votes(): string[];
	unvotes(): string[];
}

export type TransactionDataType =
	| BridgechainRegistrationData
	| BridgechainResignationData
	| BridgechainUpdateData
	| BusinessRegistrationData
	| BusinessResignationData
	| BusinessUpdateData
	| DelegateRegistrationData
	| DelegateResignationData
	| EntityRegistrationData
	| EntityResignationData
	| EntityUpdateData
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
