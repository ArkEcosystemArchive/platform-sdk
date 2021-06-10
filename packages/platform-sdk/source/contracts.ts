import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { DelegateRegistrationData } from "./dto/delegate-registration.contract";
import { DelegateResignationData } from "./dto/delegate-resignation.contract";
import { HtlcClaimData } from "./dto/htlc-claim.contract";
import { HtlcLockData } from "./dto/htlc-lock.contract";
import { HtlcRefundData } from "./dto/htlc-refund.contract";
import { IpfsData } from "./dto/ipfs.contract";
import { MultiPaymentData } from "./dto/multi-payment.contract";
import { MultiSignatureData } from "./dto/multi-signature.contract";
import { SecondSignatureData } from "./dto/second-signature.contract";
import { TransferData } from "./dto/transfer.contract";
import { VoteData } from "./dto/vote.contract";
import { RawTransactionData, SignedTransactionData } from "./dto/signed-transaction.contract";
import {
	UnspentTransactionData,
	TransactionData,
	MultiPaymentRecipient,
	TransactionDataMeta,
} from "./dto/transaction.contract";

export type KeyValuePair = Record<string, any>;

export interface WalletBalance {
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

	// Flags
	isDelegate(): boolean;

	isResignedDelegate(): boolean;

	isMultiSignature(): boolean;

	isSecondSignature(): boolean;

	toObject(): KeyValuePair;

	hasPassed(): boolean;

	hasFailed(): boolean;
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

// @TODO: export those directly from the files and get rid of this whole file
export {
	DelegateRegistrationData,
	DelegateResignationData,
	HtlcClaimData,
	HtlcLockData,
	HtlcRefundData,
	IpfsData,
	MultiPaymentData,
	MultiPaymentRecipient,
	MultiSignatureData,
	RawTransactionData,
	SecondSignatureData,
	SignedTransactionData,
	TransactionData,
	TransactionDataMeta,
	TransferData,
	UnspentTransactionData,
	VoteData,
};
