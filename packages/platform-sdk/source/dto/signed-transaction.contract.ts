import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { MultiPaymentRecipient } from "./transaction.contract";

export type RawTransactionData = any;

export interface SignedTransactionObject {
	id: string;
	sender: string;
	recipient: string;
	amount: string;
	fee: string;
	timestamp: string;
	data: RawTransactionData;
	broadcast: any;
}

export interface SignedTransactionData {
	setAttributes(attributes: { identifier: string }): void;

	configure(identifier: string, signedData: RawTransactionData, broadcastData: any, decimals?: number | string);

	// All
	id(): string;
	data(): RawTransactionData;
	sender(): string;
	recipient(): string;
	amount(): BigNumber;
	fee(): BigNumber;
	timestamp(): DateTime;

	// Types
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

	// Indicates if the transaction has been signed with a multi-signature.
	usesMultiSignature(): boolean;

	// Access & serialization
	get<T = string>(key: string): T;
	toString(): string;
	toBroadcast(): any;
	toObject(): SignedTransactionObject;
	type(): string;

	// @TODO: remove those after introducing proper signed tx DTOs
	username(): string;
	hash(): string;
	recipients(): MultiPaymentRecipient[];
}
