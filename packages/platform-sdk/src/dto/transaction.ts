/* istanbul ignore file */

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber, Censor } from "@arkecosystem/platform-sdk-support";
import { inject } from "inversify";
import emoji from "node-emoji";

import { KeyValuePair } from "../contracts";
import { NotImplemented } from "../exceptions";
import { BindingType } from "../ioc/service-provider.contract";
import {
	MultiPaymentRecipient,
	TransactionData,
	TransactionDataMeta,
	UnspentTransactionData,
} from "./transaction.contract";

export abstract class AbstractTransactionData implements TransactionData {
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

	protected decimals?: number;

	protected data!: KeyValuePair;

	@inject(BindingType.BigNumberService)
	protected readonly bigNumberService!: any; // @TODO: import BigNumberService causes a circular dependency

	public configure(data: any) {
		this.data = data;

		return this;
	}

	public withDecimals(decimals?: number | string): this {
		this.decimals = typeof decimals === "string" ? parseInt(decimals) : decimals;

		return this;
	}

	public id(): string {
		throw new NotImplemented(this.constructor.name, this.id.name);
	}

	public blockId(): string | undefined {
		throw new NotImplemented(this.constructor.name, this.blockId.name);
	}

	public type(): string {
		for (const [type, method] of Object.entries(this.#types)) {
			if (this[method]()) {
				return type;
			}
		}

		return "transfer";
	}

	public timestamp(): DateTime | undefined {
		throw new NotImplemented(this.constructor.name, this.timestamp.name);
	}

	public confirmations(): BigNumber {
		throw new NotImplemented(this.constructor.name, this.confirmations.name);
	}

	public sender(): string {
		throw new NotImplemented(this.constructor.name, this.sender.name);
	}

	public recipient(): string {
		throw new NotImplemented(this.constructor.name, this.recipient.name);
	}

	public recipients(): MultiPaymentRecipient[] {
		throw new NotImplemented(this.constructor.name, this.recipients.name);
	}

	public amount(): BigNumber {
		throw new NotImplemented(this.constructor.name, this.amount.name);
	}

	public fee(): BigNumber {
		throw new NotImplemented(this.constructor.name, this.fee.name);
	}

	public asset(): Record<string, unknown> {
		throw new NotImplemented(this.constructor.name, this.asset.name);
	}

	public inputs(): UnspentTransactionData[] {
		throw new NotImplemented(this.constructor.name, this.inputs.name);
	}

	public outputs(): UnspentTransactionData[] {
		throw new NotImplemented(this.constructor.name, this.outputs.name);
	}

	public isConfirmed(): boolean {
		throw new NotImplemented(this.constructor.name, this.isConfirmed.name);
	}

	public isSent(): boolean {
		throw new NotImplemented(this.constructor.name, this.isSent.name);
	}

	public isReceived(): boolean {
		throw new NotImplemented(this.constructor.name, this.isReceived.name);
	}

	public isTransfer(): boolean {
		throw new NotImplemented(this.constructor.name, this.isTransfer.name);
	}

	public isSecondSignature(): boolean {
		throw new NotImplemented(this.constructor.name, this.isSecondSignature.name);
	}

	public isDelegateRegistration(): boolean {
		throw new NotImplemented(this.constructor.name, this.isDelegateRegistration.name);
	}

	public isVoteCombination(): boolean {
		throw new NotImplemented(this.constructor.name, this.isVoteCombination.name);
	}

	public isVote(): boolean {
		throw new NotImplemented(this.constructor.name, this.isVote.name);
	}

	public isUnvote(): boolean {
		throw new NotImplemented(this.constructor.name, this.isUnvote.name);
	}

	public isMultiSignature(): boolean {
		throw new NotImplemented(this.constructor.name, this.isMultiSignature.name);
	}

	public isIpfs(): boolean {
		throw new NotImplemented(this.constructor.name, this.isIpfs.name);
	}

	public isMultiPayment(): boolean {
		throw new NotImplemented(this.constructor.name, this.isMultiPayment.name);
	}

	public isDelegateResignation(): boolean {
		throw new NotImplemented(this.constructor.name, this.isDelegateResignation.name);
	}

	public isHtlcLock(): boolean {
		throw new NotImplemented(this.constructor.name, this.isHtlcLock.name);
	}

	public isHtlcClaim(): boolean {
		throw new NotImplemented(this.constructor.name, this.isHtlcClaim.name);
	}

	public isHtlcRefund(): boolean {
		throw new NotImplemented(this.constructor.name, this.isHtlcRefund.name);
	}

	public isMagistrate(): boolean {
		throw new NotImplemented(this.constructor.name, this.isMagistrate.name);
	}

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
