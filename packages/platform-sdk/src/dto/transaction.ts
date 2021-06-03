import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber, Censor } from "@arkecosystem/platform-sdk-support";
import emoji from "node-emoji";

import { KeyValuePair, MultiPaymentRecipient, TransactionDataMeta, UnspentTransactionData } from "../contracts";

export abstract class AbstractTransactionData {
	/**
	 * Various coins need post-processing to determine things like
	 * "isSent" or "isReceived" with data that comes from outside
	 * of the transaction or network data itself. This object can
	 * be used to store the data necessary for those actions.
	 */
	readonly #meta: Record<string, TransactionDataMeta> = {};

	readonly #types = {
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
		magistrate: "isMagistrate",
	};

	public constructor(protected readonly data: KeyValuePair) {}

	abstract id(): string;

	abstract blockId(): string | undefined;

	public type(): string {
		for (const [type, method] of Object.entries(this.#types)) {
			if (this[method]()) {
				return type;
			}
		}

		return "transfer";
	}

	abstract timestamp(): DateTime | undefined;

	abstract confirmations(): BigNumber;

	abstract sender(): string;

	abstract recipient(): string;

	abstract recipients(): MultiPaymentRecipient[];

	abstract amount(): BigNumber;

	abstract fee(): BigNumber;

	abstract asset(): Record<string, unknown>;

	abstract inputs(): UnspentTransactionData[];

	abstract outputs(): UnspentTransactionData[];

	abstract isConfirmed(): boolean;

	abstract isSent(): boolean;

	abstract isReceived(): boolean;

	abstract isTransfer(): boolean;

	abstract isSecondSignature(): boolean;

	abstract isDelegateRegistration(): boolean;

	abstract isVoteCombination(): boolean;

	abstract isVote(): boolean;

	abstract isUnvote(): boolean;

	abstract isMultiSignature(): boolean;

	abstract isIpfs(): boolean;

	abstract isMultiPayment(): boolean;

	abstract isDelegateResignation(): boolean;

	abstract isHtlcLock(): boolean;

	abstract isHtlcClaim(): boolean;

	abstract isHtlcRefund(): boolean;

	abstract isMagistrate(): boolean;

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

	public raw(): KeyValuePair {
		return this.data;
	}

	public hasPassed(): boolean {
		return Object.keys(this.data).length > 0;
	}

	public hasFailed(): boolean {
		return !this.hasPassed();
	}

	public getMeta(key: string): TransactionDataMeta {
		return this.#meta[key];
	}

	public setMeta(key: string, value: TransactionDataMeta): void {
		this.#meta[key] = value;
	}

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
