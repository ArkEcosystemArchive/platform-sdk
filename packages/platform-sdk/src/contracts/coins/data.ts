import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { KeyValuePair } from "../types";
import { Entity } from "./entity";

/**
 *
 *
 * @export
 * @interface WalletMultiSignature
 */
export interface WalletMultiSignature {
	/**
	 *
	 *
	 * @type {number}
	 * @memberof WalletMultiSignature
	 */
	min: number;
	/**
	 *
	 *
	 * @type {string[]}
	 * @memberof WalletMultiSignature
	 */
	publicKeys: string[];
	/**
	 *
	 *
	 * @type {number}
	 * @memberof WalletMultiSignature
	 */
	limit?: number;
}

/**
 *
 *
 * @export
 * @interface WalletData
 */
export interface WalletData {
	// Wallet
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof WalletData
	 */
	primaryKey(): string;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof WalletData
	 */
	address(): string;

	/**
	 *
	 *
	 * @returns {(string | undefined)}
	 * @memberof WalletData
	 */
	publicKey(): string | undefined;

	/**
	 *
	 *
	 * @returns {BigNumber}
	 * @memberof WalletData
	 */
	balance(): BigNumber;

	/**
	 *
	 *
	 * @returns {BigNumber}
	 * @memberof WalletData
	 */
	nonce(): BigNumber;

	// Second Signature
	/**
	 *
	 *
	 * @returns {(string | undefined)}
	 * @memberof WalletData
	 */
	secondPublicKey(): string | undefined;

	// Delegate
	/**
	 *
	 *
	 * @returns {(string | undefined)}
	 * @memberof WalletData
	 */
	username(): string | undefined;

	/**
	 *
	 *
	 * @returns {(number | undefined)}
	 * @memberof WalletData
	 */
	rank(): number | undefined;

	/**
	 *
	 *
	 * @returns {(BigNumber | undefined)}
	 * @memberof WalletData
	 */
	votes(): BigNumber | undefined;

	/**
	 *
	 *
	 * @returns {WalletMultiSignature}
	 * @memberof WalletData
	 */
	multiSignature(): WalletMultiSignature;

	// Entities
	/**
	 *
	 *
	 * @returns {Entity[]}
	 * @memberof WalletData
	 */
	entities(): Entity[];

	// Flags
	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof WalletData
	 */
	isDelegate(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof WalletData
	 */
	isResignedDelegate(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof WalletData
	 */
	isMultiSignature(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof WalletData
	 */
	isSecondSignature(): boolean;

	/**
	 *
	 *
	 * @returns {KeyValuePair}
	 * @memberof WalletData
	 */
	toObject(): KeyValuePair;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof WalletData
	 */
	hasPassed(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof WalletData
	 */
	hasFailed(): boolean;
}

/**
 *
 *
 * @export
 * @interface PeerData
 */
export interface PeerData {
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof PeerData
	 */
	ip(): string;

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof PeerData
	 */
	port(): number;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof PeerData
	 */
	version(): string;

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof PeerData
	 */
	height(): number;

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof PeerData
	 */
	latency(): number;

	/**
	 *
	 *
	 * @returns {KeyValuePair}
	 * @memberof PeerData
	 */
	toObject(): KeyValuePair;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof PeerData
	 */
	hasPassed(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof PeerData
	 */
	hasFailed(): boolean;
}

/**
 *
 *
 * @export
 * @interface MultiPaymentRecipient
 */
export interface MultiPaymentRecipient {
	/**
	 *
	 *
	 * @type {string}
	 * @memberof MultiPaymentRecipient
	 */
	address: string;
	/**
	 *
	 *
	 * @type {BigNumber}
	 * @memberof MultiPaymentRecipient
	 */
	amount: BigNumber;
}

// These types and interfaces are responsible for transaction-specific methods.
export type TransactionDataMeta = string | number | boolean | undefined;

/**
 *
 *
 * @export
 * @interface UnspentTransactionData
 */
export interface UnspentTransactionData {
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof UnspentTransactionData
	 */
	id(): string;

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof UnspentTransactionData
	 */
	timestamp(): DateTime;

	/**
	 *
	 *
	 * @returns {BigNumber}
	 * @memberof UnspentTransactionData
	 */
	amount(): BigNumber;

	/**
	 *
	 *
	 * @returns {string[]}
	 * @memberof UnspentTransactionData
	 */
	addresses(): string[];
}

/**
 *
 *
 * @export
 * @interface TransactionData
 */
export interface TransactionData {
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof TransactionData
	 */
	id(): string;

	/**
	 *
	 *
	 * @returns {(string | undefined)}
	 * @memberof TransactionData
	 */
	blockId(): string | undefined;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof TransactionData
	 */
	type(): string;

	/**
	 *
	 *
	 * @returns {(DateTime | undefined)}
	 * @memberof TransactionData
	 */
	timestamp(): DateTime | undefined;

	/**
	 *
	 *
	 * @returns {BigNumber}
	 * @memberof TransactionData
	 */
	confirmations(): BigNumber;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof TransactionData
	 */
	sender(): string;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof TransactionData
	 */
	recipient(): string;

	/**
	 *
	 *
	 * @returns {MultiPaymentRecipient[]}
	 * @memberof TransactionData
	 */
	recipients(): MultiPaymentRecipient[];

	/**
	 *
	 *
	 * @returns {BigNumber}
	 * @memberof TransactionData
	 */
	amount(): BigNumber;

	/**
	 *
	 *
	 * @returns {BigNumber}
	 * @memberof TransactionData
	 */
	fee(): BigNumber;

	/**
	 *
	 *
	 * @returns {Record<string, unknown>}
	 * @memberof TransactionData
	 */
	asset(): Record<string, unknown>;

	/**
	 *
	 *
	 * @returns {UnspentTransactionData[]}
	 * @memberof TransactionData
	 */
	inputs(): UnspentTransactionData[];

	/**
	 *
	 *
	 * @returns {UnspentTransactionData[]}
	 * @memberof TransactionData
	 */
	outputs(): UnspentTransactionData[];

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isConfirmed(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isSent(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isReceived(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isTransfer(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isSecondSignature(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isDelegateRegistration(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isVoteCombination(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isVote(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isUnvote(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isMultiSignature(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isIpfs(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isMultiPayment(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isDelegateResignation(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isHtlcLock(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isHtlcClaim(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isHtlcRefund(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isEntityRegistration(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isEntityResignation(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isEntityUpdate(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isBusinessEntityRegistration(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isBusinessEntityResignation(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isBusinessEntityUpdate(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isProductEntityRegistration(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isProductEntityResignation(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isProductEntityUpdate(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isPluginEntityRegistration(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isPluginEntityResignation(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isPluginEntityUpdate(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isModuleEntityRegistration(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isModuleEntityResignation(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isModuleEntityUpdate(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isDelegateEntityRegistration(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isDelegateEntityResignation(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isDelegateEntityUpdate(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isLegacyBusinessRegistration(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isLegacyBusinessResignation(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isLegacyBusinessUpdate(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isLegacyBridgechainRegistration(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isLegacyBridgechainResignation(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	isLegacyBridgechainUpdate(): boolean;

	/**
	 *
	 *
	 * @returns {KeyValuePair}
	 * @memberof TransactionData
	 */
	toObject(): KeyValuePair;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	hasPassed(): boolean;

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof TransactionData
	 */
	hasFailed(): boolean;

	/**
	 *
	 *
	 * @param {string} key
	 * @returns {TransactionDataMeta}
	 * @memberof TransactionData
	 */
	getMeta(key: string): TransactionDataMeta;

	/**
	 *
	 *
	 * @param {string} key
	 * @param {TransactionDataMeta} value
	 * @memberof TransactionData
	 */
	setMeta(key: string, value: TransactionDataMeta): void;
}

/**
 *
 *
 * @export
 * @interface BridgechainRegistrationData
 * @extends {TransactionData}
 */
export interface BridgechainRegistrationData extends TransactionData {
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof BridgechainRegistrationData
	 */
	name(): string;

	/**
	 *
	 *
	 * @returns {string[]}
	 * @memberof BridgechainRegistrationData
	 */
	seedNodes(): string[];

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof BridgechainRegistrationData
	 */
	genesisHash(): string;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof BridgechainRegistrationData
	 */
	bridgechainRepository(): string;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof BridgechainRegistrationData
	 */
	bridgechainAssetRepository(): string;

	/**
	 *
	 *
	 * @returns {Record<string, number>}
	 * @memberof BridgechainRegistrationData
	 */
	ports(): Record<string, number>;
}

/**
 *
 *
 * @export
 * @interface BridgechainResignationData
 * @extends {TransactionData}
 */
export interface BridgechainResignationData extends TransactionData {
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof BridgechainResignationData
	 */
	bridgechainId(): string;
}

/**
 *
 *
 * @export
 * @interface BridgechainUpdateData
 * @extends {TransactionData}
 */
export interface BridgechainUpdateData extends TransactionData {
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof BridgechainUpdateData
	 */
	name(): string;

	/**
	 *
	 *
	 * @returns {string[]}
	 * @memberof BridgechainUpdateData
	 */
	seedNodes(): string[];

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof BridgechainUpdateData
	 */
	bridgechainRepository(): string;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof BridgechainUpdateData
	 */
	bridgechainAssetRepository(): string;

	/**
	 *
	 *
	 * @returns {Record<string, number>}
	 * @memberof BridgechainUpdateData
	 */
	ports(): Record<string, number>;
}

/**
 *
 *
 * @export
 * @interface BusinessRegistrationData
 * @extends {TransactionData}
 */
export interface BusinessRegistrationData extends TransactionData {
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof BusinessRegistrationData
	 */
	name(): string;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof BusinessRegistrationData
	 */
	website(): string;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof BusinessRegistrationData
	 */
	vatId(): string;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof BusinessRegistrationData
	 */
	repository(): string;
}

/**
 *
 *
 * @export
 * @interface BusinessResignationData
 * @extends {TransactionData}
 */
export interface BusinessResignationData extends TransactionData {}

/**
 *
 *
 * @export
 * @interface BusinessUpdateData
 * @extends {TransactionData}
 */
export interface BusinessUpdateData extends TransactionData {
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof BusinessUpdateData
	 */
	name(): string;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof BusinessUpdateData
	 */
	website(): string;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof BusinessUpdateData
	 */
	vatId(): string;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof BusinessUpdateData
	 */
	repository(): string;
}

/**
 *
 *
 * @export
 * @interface DelegateRegistrationData
 * @extends {TransactionData}
 */
export interface DelegateRegistrationData extends TransactionData {
	username(): string;
}

/**
 *
 *
 * @export
 * @interface DelegateResignationData
 * @extends {TransactionData}
 */
export interface DelegateResignationData extends TransactionData {}

/**
 *
 *
 * @export
 * @interface EntityRegistrationData
 * @extends {TransactionData}
 */
export interface EntityRegistrationData extends TransactionData {
	/**
	 *
	 *
	 * @returns {number}
	 * @memberof EntityRegistrationData
	 */
	entityType(): number;

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof EntityRegistrationData
	 */
	entitySubType(): number;

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof EntityRegistrationData
	 */
	entityAction(): number;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof EntityRegistrationData
	 */
	name(): string;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof EntityRegistrationData
	 */
	ipfs(): string;
}

/**
 *
 *
 * @export
 * @interface EntityResignationData
 * @extends {TransactionData}
 */
export interface EntityResignationData extends TransactionData {
	/**
	 *
	 *
	 * @returns {number}
	 * @memberof EntityResignationData
	 */
	entityType(): number;

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof EntityResignationData
	 */
	entitySubType(): number;

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof EntityResignationData
	 */
	entityAction(): number;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof EntityResignationData
	 */
	registrationId(): string;
}

/**
 *
 *
 * @export
 * @interface EntityUpdateData
 * @extends {TransactionData}
 */
export interface EntityUpdateData extends TransactionData {
	/**
	 *
	 *
	 * @returns {number}
	 * @memberof EntityUpdateData
	 */
	entityType(): number;

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof EntityUpdateData
	 */
	entitySubType(): number;

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof EntityUpdateData
	 */
	entityAction(): number;

	/**
	 *
	 *
	 * @returns {(string | undefined)}
	 * @memberof EntityUpdateData
	 */
	name(): string | undefined;

	/**
	 *
	 *
	 * @returns {(string | undefined)}
	 * @memberof EntityUpdateData
	 */
	ipfs(): string | undefined;
}

/**
 *
 *
 * @export
 * @interface HtlcClaimData
 * @extends {TransactionData}
 */
export interface HtlcClaimData extends TransactionData {
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof HtlcClaimData
	 */
	lockTransactionId(): string;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof HtlcClaimData
	 */
	unlockSecret(): string;
}

/**
 *
 *
 * @export
 * @interface HtlcLockData
 * @extends {TransactionData}
 */
export interface HtlcLockData extends TransactionData {
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof HtlcLockData
	 */
	secretHash(): string;

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof HtlcLockData
	 */
	expirationType(): number;

	/**
	 *
	 *
	 * @returns {number}
	 * @memberof HtlcLockData
	 */
	expirationValue(): number;
}

/**
 *
 *
 * @export
 * @interface HtlcRefundData
 * @extends {TransactionData}
 */
export interface HtlcRefundData extends TransactionData {
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof HtlcRefundData
	 */
	lockTransactionId(): string;
}

/**
 *
 *
 * @export
 * @interface IpfsData
 * @extends {TransactionData}
 */
export interface IpfsData extends TransactionData {
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof IpfsData
	 */
	hash(): string;
}

/**
 *
 *
 * @export
 * @interface MultiPaymentData
 * @extends {TransactionData}
 */
export interface MultiPaymentData extends TransactionData {
	/**
	 *
	 *
	 * @returns {(string | undefined)}
	 * @memberof MultiPaymentData
	 */
	memo(): string | undefined;
	/**
	 *
	 *
	 * @returns {{
	 * 		recipientId: string;
	 * 		amount: string
	 * 	}[]}
	 * @memberof MultiPaymentData
	 */
	payments(): {
		recipientId: string;
		amount: string;
	}[];
}

/**
 *
 *
 * @export
 * @interface MultiSignatureData
 * @extends {TransactionData}
 */
export interface MultiSignatureData extends TransactionData {
	/**
	 *
	 *
	 * @returns {string[]}
	 * @memberof MultiSignatureData
	 */
	publicKeys(): string[];
	/**
	 *
	 *
	 * @returns {number}
	 * @memberof MultiSignatureData
	 */
	min(): number;
}

/**
 *
 *
 * @export
 * @interface SecondSignatureData
 * @extends {TransactionData}
 */
export interface SecondSignatureData extends TransactionData {
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof SecondSignatureData
	 */
	secondPublicKey(): string;
}

/**
 *
 *
 * @export
 * @interface TransferData
 * @extends {TransactionData}
 */
export interface TransferData extends TransactionData {
	/**
	 *
	 *
	 * @returns {(string | undefined)}
	 * @memberof TransferData
	 */
	memo(): string | undefined;
}

/**
 *
 *
 * @export
 * @interface VoteData
 * @extends {TransactionData}
 */
export interface VoteData extends TransactionData {
	/**
	 *
	 *
	 * @returns {string[]}
	 * @memberof VoteData
	 */
	votes(): string[];
	/**
	 *
	 *
	 * @returns {string[]}
	 * @memberof VoteData
	 */
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

export type RawTransactionData = any;

/**
 *
 *
 * @export
 * @interface SignedTransactionData
 */
export interface SignedTransactionData {
	/**
	 *
	 *
	 * @param {{ identifier: string }} attributes
	 * @memberof SignedTransactionData
	 */
	setAttributes(attributes: { identifier: string }): void;

	// All
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof SignedTransactionData
	 */
	id(): string;
	/**
	 *
	 *
	 * @returns {RawTransactionData}
	 * @memberof SignedTransactionData
	 */
	data(): RawTransactionData;
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof SignedTransactionData
	 */
	sender(): string;
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof SignedTransactionData
	 */
	recipient(): string;
	/**
	 *
	 *
	 * @returns {BigNumber}
	 * @memberof SignedTransactionData
	 */
	amount(): BigNumber;
	/**
	 *
	 *
	 * @returns {BigNumber}
	 * @memberof SignedTransactionData
	 */
	fee(): BigNumber;

	// MultiSignature
	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof SignedTransactionData
	 */
	isMultiSignature(): boolean;
	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof SignedTransactionData
	 */
	isMultiSignatureRegistration(): boolean;

	// Helpers
	/**
	 *
	 *
	 * @template T
	 * @param {string} key
	 * @returns {T}
	 * @memberof SignedTransactionData
	 */
	get<T = string>(key: string): T;
	/**
	 *
	 *
	 * @returns {string}
	 * @memberof SignedTransactionData
	 */
	toString(): string;
	/**
	 *
	 *
	 * @returns {*}
	 * @memberof SignedTransactionData
	 */
	toBroadcast(): any;
	/**
	 *
	 *
	 * @returns {{ id: string; sender: string; recipient: string; amount: string; data: any }}
	 * @memberof SignedTransactionData
	 */
	toObject(): { id: string; sender: string; recipient: string; amount: string; data: any };
}
