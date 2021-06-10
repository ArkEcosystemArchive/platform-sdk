import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { IReadWriteWallet } from "../contracts";
export declare class TransactionData {
	#private;
	constructor(wallet: IReadWriteWallet, data: Contracts.TransactionDataType);
	id(): string;
	blockId(): string | undefined;
	type(): string;
	timestamp(): DateTime | undefined;
	confirmations(): BigNumber;
	sender(): string;
	recipient(): string;
	recipients(): Contracts.MultiPaymentRecipient[];
	amount(): BigNumber;
	convertedAmount(): BigNumber;
	fee(): BigNumber;
	convertedFee(): BigNumber;
	memo(): string | undefined;
	asset(): Record<string, unknown>;
	isConfirmed(): boolean;
	inputs(): Contracts.UnspentTransactionData[];
	outputs(): Contracts.UnspentTransactionData[];
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
	explorerLink(): string;
	explorerLinkForBlock(): string | undefined;
	toObject(): Contracts.KeyValuePair;
	hasPassed(): boolean;
	hasFailed(): boolean;
	getMeta(key: string): Contracts.TransactionDataMeta;
	setMeta(key: string, value: Contracts.TransactionDataMeta): void;
	/**
	 * These methods serve as helpers to aggregate commonly used values.
	 */
	total(): BigNumber;
	convertedTotal(): BigNumber;
	/**
	 * These methods serve as helpers to quickly access entities related to the transaction.
	 *
	 * These are subject to be removed at any time due to them primarily existing for usage
	 * in the Desktop and Mobile Wallet. Use them at your own risk in your own applications.
	 */
	wallet(): IReadWriteWallet;
	coin(): Coins.Coin;
	protected data<T>(): T;
}
export declare class DelegateRegistrationData extends TransactionData {
	username(): string;
}
export declare class DelegateResignationData extends TransactionData {}
export declare class HtlcClaimData extends TransactionData {
	lockTransactionId(): string;
	unlockSecret(): string;
}
export declare class HtlcLockData extends TransactionData {
	secretHash(): string;
	expirationType(): number;
	expirationValue(): number;
}
export declare class HtlcRefundData extends TransactionData {
	lockTransactionId(): string;
}
export declare class IpfsData extends TransactionData {
	hash(): string;
}
export declare class MultiPaymentData extends TransactionData {
	payments(): {
		recipientId: string;
		amount: string;
	}[];
}
export declare class MultiSignatureData extends TransactionData {
	publicKeys(): string[];
	min(): number;
}
export declare class SecondSignatureData extends TransactionData {
	secondPublicKey(): string;
}
export declare class TransferData extends TransactionData {
	memo(): string | undefined;
}
export declare class VoteData extends TransactionData {
	votes(): string[];
	unvotes(): string[];
}
export declare type ExtendedTransactionData =
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
