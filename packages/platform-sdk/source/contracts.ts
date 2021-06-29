import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { RawTransactionData, SignedTransactionData } from "./dto/signed-transaction.contract";
import {
	UnspentTransactionData,
	ConfirmedTransactionData,
	MultiPaymentRecipient,
	TransactionDataMeta,
} from "./dto/confirmed-transaction.contract";

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
	fill(data: any): WalletData;

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

// @TODO: export those directly from the files and get rid of this whole file
export {
	ConfirmedTransactionData,
	MultiPaymentRecipient,
	RawTransactionData,
	SignedTransactionData,
	TransactionDataMeta,
	UnspentTransactionData,
};
