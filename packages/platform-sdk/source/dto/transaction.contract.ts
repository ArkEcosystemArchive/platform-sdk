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

export interface TransactionData {
	configure(data: any): TransactionData;

	withDecimals(decimals?: number | string): TransactionData;

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

	toObject(): Record<string, any>;

	toJSON(): Record<string, any>;

	toHuman(): Record<string, any>;

	hasPassed(): boolean;

	hasFailed(): boolean;

	getMeta(key: string): TransactionDataMeta;

	setMeta(key: string, value: TransactionDataMeta): void;
}
