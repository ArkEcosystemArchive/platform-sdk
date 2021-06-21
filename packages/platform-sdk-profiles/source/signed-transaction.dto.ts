/* istanbul ignore file */

import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class ExtendedSignedTransactionData {
	readonly #data: Contracts.SignedTransactionData;

	public constructor(data: Contracts.SignedTransactionData) {
		this.#data = data;
	}

	public data(): Contracts.SignedTransactionData {
		return this.#data;
	}

	public id(): string {
		return this.#data.id();
	}

	public type(): string {
		return this.#data.type();
	}

	public sender(): string {
		return this.#data.sender();
	}

	public recipient(): string {
		return this.#data.recipient();
	}

	public amount(): number {
		return this.#data.amount().toHuman();
	}

	public fee(): number {
		return this.#data.fee().toHuman();
	}

	public timestamp(): DateTime {
		return this.#data.timestamp();
	}

	public isTransfer(): boolean {
		return this.#data.isTransfer();
	}

	public isSecondSignature(): boolean {
		return this.#data.isSecondSignature();
	}

	public isDelegateRegistration(): boolean {
		return this.#data.isDelegateRegistration();
	}

	public isVoteCombination(): boolean {
		return this.#data.isVoteCombination();
	}

	public isVote(): boolean {
		return this.#data.isVote();
	}

	public isUnvote(): boolean {
		return this.#data.isUnvote();
	}

	public isMultiSignatureRegistration(): boolean {
		return this.#data.isMultiSignatureRegistration();
	}

	public isIpfs(): boolean {
		return this.#data.isIpfs();
	}

	public isMultiPayment(): boolean {
		return this.#data.isMultiPayment();
	}

	public isDelegateResignation(): boolean {
		return this.#data.isDelegateResignation();
	}

	public isHtlcLock(): boolean {
		return this.#data.isHtlcLock();
	}

	public isHtlcClaim(): boolean {
		return this.#data.isHtlcClaim();
	}

	public isHtlcRefund(): boolean {
		return this.#data.isHtlcRefund();
	}

	public isMagistrate(): boolean {
		return this.#data.isMagistrate();
	}

	public usesMultiSignature(): boolean {
		return this.#data.usesMultiSignature();
	}

	public get<T = string>(key: string): T {
		return this.#data.get(key);
	}

	public toString(): string {
		return this.#data.toString();
	}

	public toBroadcast(): any {
		return this.#data.toBroadcast();
	}

	public toObject(): DTO.SignedTransactionObject {
		return this.#data.toObject();
	}

	// @TODO: remove those after introducing proper signed tx DTOs (ARK/LSK specific)
	public username(): string {
		return this.#data.username();
	}

	public hash(): string {
		return this.#data.hash();
	}

	public recipients(): Contracts.MultiPaymentRecipient[] {
		return this.#data.recipients().map((payment: { address: string; amount: BigNumber }) => ({
			address: payment.address,
			amount: payment.amount.toHuman(),
		}));
	}
}
