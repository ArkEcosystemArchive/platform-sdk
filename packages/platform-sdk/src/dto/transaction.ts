import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber, Censor } from "@arkecosystem/platform-sdk-support";
import emoji from "node-emoji";

import { MultiPaymentRecipient, TransactionDataMeta, UnspentTransactionData } from "../contracts/coins/data";
import { KeyValuePair } from "../contracts/types";

/**
 *
 *
 * @export
 * @abstract
 * @class AbstractTransactionData
 */
export abstract class AbstractTransactionData {
	/**
	 * Various coins need post-processing to determine things like
	 * "isSent" or "isReceived" with data that comes from outside
	 * of the transaction or network data itself. This object can
	 * be used to store the data necessary for those actions.
	 */
	/**
	 *
	 *
	 * @type {Record<string, TransactionDataMeta>}
	 * @memberof AbstractTransactionData
	 */
	readonly #meta: Record<string, TransactionDataMeta> = {};

	/**
	 *
	 *
	 * @memberof AbstractTransactionData
	 */
	readonly #types = {
		// Core
		transfer: "isTransfer",
		secondSignature: "isSecondSignature",
		delegateRegistration: "isDelegateRegistration",
		voteCombination: "isVoteCombination",
		vote: "isVote",
		unvote: "isUnvote",
		multiSignature: "isMultiSignature",
		ipfs: "isIpfs",
		multiPayment: "isMultiPayment",
		delegateResignation: "isDelegateResignation",
		htlcLock: "isHtlcLock",
		htlcClaim: "isHtlcClaim",
		htlcRefund: "isHtlcRefund",
		// Magistrate
		businessEntityRegistration: "isBusinessEntityRegistration",
		businessEntityResignation: "isBusinessEntityResignation",
		businessEntityUpdate: "isBusinessEntityUpdate",
		productEntityRegistration: "isProductEntityRegistration",
		productEntityResignation: "isProductEntityResignation",
		productEntityUpdate: "isProductEntityUpdate",
		pluginEntityRegistration: "isPluginEntityRegistration",
		pluginEntityResignation: "isPluginEntityResignation",
		pluginEntityUpdate: "isPluginEntityUpdate",
		moduleEntityRegistration: "isModuleEntityRegistration",
		moduleEntityResignation: "isModuleEntityResignation",
		moduleEntityUpdate: "isModuleEntityUpdate",
		delegateEntityRegistration: "isDelegateEntityRegistration",
		delegateEntityResignation: "isDelegateEntityResignation",
		delegateEntityUpdate: "isDelegateEntityUpdate",
		entityRegistration: "isEntityRegistration",
		entityResignation: "isEntityResignation",
		entityUpdate: "isEntityUpdate",
		// Legacy Magistrate
		legacyBusinessRegistration: "isLegacyBusinessRegistration",
		legacyBusinessResignation: "isLegacyBusinessResignation",
		legacyBusinessUpdate: "isLegacyBusinessUpdate",
		legacyBridgechainRegistration: "isLegacyBridgechainRegistration",
		legacyBridgechainResignation: "isLegacyBridgechainResignation",
		legacyBridgechainUpdate: "isLegacyBridgechainUpdate",
	};

	/**
	 *Creates an instance of AbstractTransactionData.
	 * @param {KeyValuePair} data
	 * @memberof AbstractTransactionData
	 */
	public constructor(protected readonly data: KeyValuePair) {}

	/**
	 *
	 *
	 * @abstract
	 * @returns {string}
	 * @memberof AbstractTransactionData
	 */
	abstract id(): string;

	/**
	 *
	 *
	 * @abstract
	 * @returns {(string | undefined)}
	 * @memberof AbstractTransactionData
	 */
	abstract blockId(): string | undefined;

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof AbstractTransactionData
	 */
	public type(): string {
		for (const [type, method] of Object.entries(this.#types)) {
			if (this[method]()) {
				return type;
			}
		}

		return "transfer";
	}

	/**
	 *
	 *
	 * @abstract
	 * @returns {(DateTime | undefined)}
	 * @memberof AbstractTransactionData
	 */
	abstract timestamp(): DateTime | undefined;

	/**
	 *
	 *
	 * @abstract
	 * @returns {BigNumber}
	 * @memberof AbstractTransactionData
	 */
	abstract confirmations(): BigNumber;

	/**
	 *
	 *
	 * @abstract
	 * @returns {string}
	 * @memberof AbstractTransactionData
	 */
	abstract sender(): string;

	/**
	 *
	 *
	 * @abstract
	 * @returns {string}
	 * @memberof AbstractTransactionData
	 */
	abstract recipient(): string;

	/**
	 *
	 *
	 * @abstract
	 * @returns {MultiPaymentRecipient[]}
	 * @memberof AbstractTransactionData
	 */
	abstract recipients(): MultiPaymentRecipient[];

	/**
	 *
	 *
	 * @abstract
	 * @returns {BigNumber}
	 * @memberof AbstractTransactionData
	 */
	abstract amount(): BigNumber;

	/**
	 *
	 *
	 * @abstract
	 * @returns {BigNumber}
	 * @memberof AbstractTransactionData
	 */
	abstract fee(): BigNumber;

	/**
	 *
	 *
	 * @abstract
	 * @returns {Record<string, unknown>}
	 * @memberof AbstractTransactionData
	 */
	abstract asset(): Record<string, unknown>;

	/**
	 *
	 *
	 * @abstract
	 * @returns {UnspentTransactionData[]}
	 * @memberof AbstractTransactionData
	 */
	abstract inputs(): UnspentTransactionData[];

	/**
	 *
	 *
	 * @abstract
	 * @returns {UnspentTransactionData[]}
	 * @memberof AbstractTransactionData
	 */
	abstract outputs(): UnspentTransactionData[];

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isConfirmed(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isSent(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isReceived(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isTransfer(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isSecondSignature(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isDelegateRegistration(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isVoteCombination(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isVote(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isUnvote(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isMultiSignature(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isIpfs(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isMultiPayment(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isDelegateResignation(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isHtlcLock(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isHtlcClaim(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isHtlcRefund(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isEntityRegistration(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isEntityResignation(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isEntityUpdate(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isBusinessEntityRegistration(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isBusinessEntityResignation(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isBusinessEntityUpdate(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isProductEntityRegistration(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isProductEntityResignation(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isProductEntityUpdate(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isPluginEntityRegistration(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isPluginEntityResignation(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isPluginEntityUpdate(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isModuleEntityRegistration(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isModuleEntityResignation(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isModuleEntityUpdate(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isDelegateEntityRegistration(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isDelegateEntityResignation(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isDelegateEntityUpdate(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isLegacyBusinessRegistration(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isLegacyBusinessResignation(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isLegacyBusinessUpdate(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isLegacyBridgechainRegistration(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isLegacyBridgechainResignation(): boolean;

	/**
	 *
	 *
	 * @abstract
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	abstract isLegacyBridgechainUpdate(): boolean;

	/**
	 *
	 *
	 * @returns {KeyValuePair}
	 * @memberof AbstractTransactionData
	 */
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
			asset: this.asset(),
		};
	}

	/**
	 *
	 *
	 * @returns {KeyValuePair}
	 * @memberof AbstractTransactionData
	 */
	public raw(): KeyValuePair {
		return this.data;
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	public hasPassed(): boolean {
		return Object.keys(this.data).length > 0;
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof AbstractTransactionData
	 */
	public hasFailed(): boolean {
		return !this.hasPassed();
	}

	/**
	 *
	 *
	 * @param {string} key
	 * @returns {TransactionDataMeta}
	 * @memberof AbstractTransactionData
	 */
	public getMeta(key: string): TransactionDataMeta {
		return this.#meta[key];
	}

	/**
	 *
	 *
	 * @param {string} key
	 * @param {TransactionDataMeta} value
	 * @memberof AbstractTransactionData
	 */
	public setMeta(key: string, value: TransactionDataMeta): void {
		this.#meta[key] = value;
	}

	/**
	 *
	 *
	 * @protected
	 * @param {string} [memo]
	 * @returns {(string | undefined)}
	 * @memberof AbstractTransactionData
	 */
	protected censorMemo(memo?: string): string | undefined {
		if (!memo || memo.length <= 0) {
			return undefined;
		}

		const processor: Censor = new Censor();

		if (processor.isBad(memo)) {
			return undefined;
		}

		return processor.process(emoji.emojify(memo));
	}
}
