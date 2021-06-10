import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { KeyValuePair } from "../contracts";
import {
	MultiPaymentRecipient,
	TransactionData,
	TransactionDataMeta,
	UnspentTransactionData,
} from "./transaction.contract";
export declare abstract class AbstractTransactionData implements TransactionData {
	#private;
	protected decimals?: number;
	protected data: KeyValuePair;
	protected readonly bigNumberService: any;
	configure(data: any): this;
	withDecimals(decimals?: number | string): this;
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
	raw(): KeyValuePair;
	hasPassed(): boolean;
	hasFailed(): boolean;
	getMeta(key: string): TransactionDataMeta;
	setMeta(key: string, value: TransactionDataMeta): void;
	protected censorMemo(memo?: string): string | undefined;
}
