import { Contracts } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { Wallet } from "./wallet";

/**
 * This class serves as a wrapper around the original TransactionData
 * because certain behaviours can't be leaked into coin implementations.
 *
 * For example to determine if a transaction was sent or received it is
 * necessary to know the address and public key but API calls always only
 * know either of them, not both. This is because only 1 of them is required
 * by APIs to return transactions based on a unique identifier.
 *
 * To avoid leaking behaviours into the coin implementations or having to do
 * identity computations inside of them we will simply do some generic checks
 * in this class which also provides us more flexibility like adding fiat methods.
 */
export class TransactionData {
	readonly #transaction: Contracts.TransactionData;
	readonly #wallet: Wallet;

	public constructor(transaction: Contracts.TransactionData, wallet: Wallet) {
		this.#transaction = transaction;
		this.#wallet = wallet;
	}

	public id(): string {
		return this.#transaction.id();
	}

	public type(): string {
		return this.#transaction.type();
	}

	public timestamp(): number | undefined {
		return this.#transaction.timestamp();
	}

	public confirmations(): BigNumber {
		return this.#transaction.confirmations();
	}

	public sender(): string {
		return this.#transaction.sender();
	}

	public recipient(): string {
		return this.#transaction.recipient();
	}

	public recipients(): Contracts.MultiPaymentRecipient[] {
		return this.#transaction.recipients();
	}

	public amount(): BigNumber {
		return this.#transaction.amount();
	}

	public fee(): BigNumber {
		return this.#transaction.fee();
	}

	public memo(): string | undefined {
		return this.#transaction.memo();
	}

	public asset(): object | undefined {
		return this.#transaction.asset();
	}

	public isSent(): boolean {
		return [this.#wallet.address(), this.#wallet.publicKey()].includes(this.sender());
	}

	public isReceived(): boolean {
		return [this.#wallet.address(), this.#wallet.publicKey()].includes(this.recipient());
	}

	public isTransfer(): boolean {
		return this.#transaction.isTransfer();
	}

	public isSecondSignature(): boolean {
		return this.#transaction.isSecondSignature();
	}

	public isDelegateRegistration(): boolean {
		return this.#transaction.isDelegateRegistration();
	}

	public isVote(): boolean {
		return this.#transaction.isVote();
	}

	public isMultiSignature(): boolean {
		return this.#transaction.isMultiSignature();
	}

	public isIpfs(): boolean {
		return this.#transaction.isIpfs();
	}

	public isMultiPayment(): boolean {
		return this.#transaction.isMultiPayment();
	}

	public isDelegateResignation(): boolean {
		return this.#transaction.isDelegateResignation();
	}

	public isHtlcLock(): boolean {
		return this.#transaction.isHtlcLock();
	}

	public isHtlcClaim(): boolean {
		return this.#transaction.isHtlcClaim();
	}

	public isHtlcRefund(): boolean {
		return this.#transaction.isHtlcRefund();
	}

	public isBusinessRegistration(): boolean {
		return this.#transaction.isBusinessRegistration();
	}

	public isBusinessResignation(): boolean {
		return this.#transaction.isBusinessResignation();
	}

	public isBusinessUpdate(): boolean {
		return this.#transaction.isBusinessUpdate();
	}

	public isBridgechainRegistration(): boolean {
		return this.#transaction.isBridgechainRegistration();
	}

	public isBridgechainResignation(): boolean {
		return this.#transaction.isBridgechainResignation();
	}

	public isBridgechainUpdate(): boolean {
		return this.#transaction.isBridgechainUpdate();
	}

	public isEntityRegistration(): boolean {
		return this.#transaction.isEntityRegistration();
	}

	public isEntityResignation(): boolean {
		return this.#transaction.isEntityResignation();
	}

	public isEntityUpdate(): boolean {
		return this.#transaction.isEntityUpdate();
	}

	public toObject(): Record<string, any> {
		return this.#transaction.toObject();
	}
}
