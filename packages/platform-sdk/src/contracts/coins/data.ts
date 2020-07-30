import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { KeyValuePair } from "../types";

export type TransactionDataMeta = string | number | boolean | undefined;

export interface TransactionData {
	id(): string;

	type(): string;

	timestamp(): number | undefined;

	confirmations(): BigNumber;

	sender(): string;

	recipient(): string;

	recipients(): MultiPaymentRecipient[];

	amount(): BigNumber;

	fee(): BigNumber;

	memo(): string | undefined;

	asset(): Record<string, unknown>;

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

	getMeta(key: string): TransactionDataMeta;

	setMeta(key: string, value: TransactionDataMeta): void;
}

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
}

export interface PeerData {
	ip(): string;

	port(): number;

	version(): string;

	height(): number;

	latency(): number;

	toObject(): KeyValuePair;
}

export interface MultiPaymentRecipient {
	address: string;
	amount: BigNumber;
}
