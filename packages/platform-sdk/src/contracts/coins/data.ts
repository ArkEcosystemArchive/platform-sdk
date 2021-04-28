import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { KeyValuePair } from "../types";
import { Entity } from "./entity";

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

	balance(): BigNumber;

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

	isEntityRegistration(): boolean;

	isEntityResignation(): boolean;

	isEntityUpdate(): boolean;

	isBusinessEntityRegistration(): boolean;

	isBusinessEntityResignation(): boolean;

	isBusinessEntityUpdate(): boolean;

	isProductEntityRegistration(): boolean;

	isProductEntityResignation(): boolean;

	isProductEntityUpdate(): boolean;

	isPluginEntityRegistration(): boolean;

	isPluginEntityResignation(): boolean;

	isPluginEntityUpdate(): boolean;

	isModuleEntityRegistration(): boolean;

	isModuleEntityResignation(): boolean;

	isModuleEntityUpdate(): boolean;

	isDelegateEntityRegistration(): boolean;

	isDelegateEntityResignation(): boolean;

	isDelegateEntityUpdate(): boolean;

	isLegacyBusinessRegistration(): boolean;

	isLegacyBusinessResignation(): boolean;

	isLegacyBusinessUpdate(): boolean;

	isLegacyBridgechainRegistration(): boolean;

	isLegacyBridgechainResignation(): boolean;

	isLegacyBridgechainUpdate(): boolean;

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

export interface EntityResignationData extends TransactionData {
	entityType(): number;

	entitySubType(): number;

	entityAction(): number;

	registrationId(): string;
}

export interface EntityUpdateData extends TransactionData {
	entityType(): number;

	entitySubType(): number;

	entityAction(): number;

	name(): string | undefined;

	ipfs(): string | undefined;
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
