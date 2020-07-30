import { BigNumber, Censor } from "@arkecosystem/platform-sdk-support";
import emoji from "node-emoji";

import { MultiPaymentRecipient, TransactionDataMeta } from "../contracts/coins/data";
import { KeyValuePair } from "../contracts/types";

export abstract class AbstractTransactionData {
	/**
	 * Various coins need post-processing to determine things like
	 * "isSent" or "isReceived" with data that comes from outside
	 * of the transaction or network data itself. This object can
	 * be used to store the data necessary for those actions.
	 */
	readonly #meta: Record<string, TransactionDataMeta> = {};

	public constructor(protected readonly data: KeyValuePair) {}

	abstract id(): string;

	abstract type(): string;

	abstract timestamp(): number | undefined;

	abstract confirmations(): BigNumber;

	abstract sender(): string;

	abstract recipient(): string;

	abstract recipients(): MultiPaymentRecipient[];

	abstract amount(): BigNumber;

	abstract fee(): BigNumber;

	abstract memo(): string | undefined;

	abstract asset(): Record<string, unknown>;

	abstract isSent(): boolean;

	abstract isReceived(): boolean;

	abstract isTransfer(): boolean;

	abstract isSecondSignature(): boolean;

	abstract isDelegateRegistration(): boolean;

	abstract isVote(): boolean;

	abstract isUnvote(): boolean;

	abstract isMultiSignature(): boolean;

	abstract isIpfs(): boolean;

	abstract isMultiPayment(): boolean;

	abstract isDelegateResignation(): boolean;

	abstract isHtlcLock(): boolean;

	abstract isHtlcClaim(): boolean;

	abstract isHtlcRefund(): boolean;

	abstract isBusinessRegistration(): boolean;

	abstract isBusinessResignation(): boolean;

	abstract isBusinessUpdate(): boolean;

	abstract isBridgechainRegistration(): boolean;

	abstract isBridgechainResignation(): boolean;

	abstract isBridgechainUpdate(): boolean;

	abstract isEntityRegistration(): boolean;

	abstract isEntityResignation(): boolean;

	abstract isEntityUpdate(): boolean;

	public toObject(): KeyValuePair {
		return {
			id: this.id(),
			type: this.type(),
			timestamp: this.timestamp(),
			confirmations: this.confirmations(),
			sender: this.sender(),
			recipient: this.recipient(),
			amount: this.amount(),
			fee: this.fee(),
			vendorField: this.memo(),
			asset: this.asset(),
		};
	}

	public raw(): KeyValuePair {
		return this.data;
	}

	public hasData(): boolean {
		return this.data !== undefined;
	}

	public getMeta(key: string): TransactionDataMeta {
		return this.#meta[key];
	}

	public setMeta(key: string, value: TransactionDataMeta): void {
		this.#meta[key] = value;
	}

	protected censorMemo(memo?: string): string | undefined {
		if (memo) {
			const processor: Censor = new Censor();

			if (processor.isBad(memo)) {
				return undefined;
			}

			return processor.process(emoji.emojify(memo));
		}

		return memo;
	}
}

export interface BridgechainRegistrationData {
	name(): string;

	seedNodes(): string[];

	genesisHash(): string;

	bridgechainRepository(): string;

	bridgechainAssetRepository(): string;

	ports(): Record<string, number>;
}

export interface BridgechainResignationData {
	bridgechainId(): string;
}

export interface BridgechainUpdateData {
	name(): string;

	seedNodes(): string[];

	bridgechainRepository(): string;

	bridgechainAssetRepository(): string;

	ports(): Record<string, number>;
}

export interface BusinessRegistrationData {
	name(): string;

	website(): string;

	vatId(): string;

	repository(): string;
}

export interface BusinessResignationData {}

export interface BusinessUpdateData {
	name(): string;

	website(): string;

	vatId(): string;

	repository(): string;
}

export interface DelegateRegistrationData {
	username(): string;
}

export interface DelegateResignationData {}

export interface EntityRegistrationData {
	entityType(): number;

	entitySubType(): number;

	entityAction(): number;

	name(): string;

	ipfs(): string;
}

export interface EntityResignationData {}

export interface EntityUpdateData {
	entityType(): number;

	entitySubType(): number;

	entityAction(): number;

	ipfs(): string;
}

export interface HtlcClaimData {
	lockTransactionId(): string;

	unlockSecret(): string;
}

export interface HtlcLockData {
	secretHash(): string;

	expirationType(): number;

	expirationValue(): number;
}

export interface HtlcRefundData {
	lockTransactionId(): string;
}

export interface IpfsData {
	hash(): string;
}

export interface MultiPaymentData {
	payments(): { recipientId: string; amount: string }[];
}

export interface MultiSignatureData {
	publicKeys(): string[];
	min(): number;
}

export interface SecondSignatureData {
	secondPublicKey(): string;
}

export interface TransferData {}

export interface VoteData {
	votes(): string[];
	unvotes(): string[];
}
