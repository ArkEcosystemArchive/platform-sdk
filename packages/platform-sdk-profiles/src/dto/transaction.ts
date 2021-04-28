import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { IExchangeRateService, IReadWriteWallet } from "../contracts";
import { container } from "../environment/container";
import { Identifiers } from "../environment/container.models";

export class TransactionData {
	readonly #wallet: IReadWriteWallet;
	readonly #coin: Coins.Coin;
	readonly #data: Contracts.TransactionDataType;

	public constructor(wallet: IReadWriteWallet, data: Contracts.TransactionDataType) {
		this.#wallet = wallet;
		this.#coin = wallet.coin();
		this.#data = data;
	}

	public id(): string {
		return this.#data.id();
	}

	public blockId(): string | undefined {
		return this.#data.blockId();
	}

	public type(): string {
		return this.#data.type();
	}

	public timestamp(): DateTime | undefined {
		return this.#data.timestamp();
	}

	public confirmations(): BigNumber {
		return this.#data.confirmations();
	}

	public sender(): string {
		return this.#data.sender();
	}

	public recipient(): string {
		return this.#data.recipient();
	}

	public recipients(): Contracts.MultiPaymentRecipient[] {
		return this.#data.recipients();
	}

	public amount(): BigNumber {
		return this.#data.amount();
	}

	public convertedAmount(): BigNumber {
		return this.convertAmount(this.amount().divide(1e8));
	}

	public fee(): BigNumber {
		return this.#data.fee();
	}

	public convertedFee(): BigNumber {
		return this.convertAmount(this.fee().divide(1e8));
	}

	public memo(): string | undefined {
		// @ts-ignore
		return this.#data.memo?.();
	}

	public asset(): Record<string, unknown> {
		return this.#data.asset();
	}

	public isConfirmed(): boolean {
		return this.#data.isConfirmed();
	}

	public inputs(): Contracts.UnspentTransactionData[] {
		return this.#data.inputs();
	}

	public outputs(): Contracts.UnspentTransactionData[] {
		return this.#data.outputs();
	}

	public isSent(): boolean {
		return this.#data.isSent();
	}

	public isReceived(): boolean {
		return this.#data.isReceived();
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

	public isMultiSignature(): boolean {
		return this.#data.isMultiSignature();
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

	public explorerLink(): string {
		return this.#coin.link().transaction(this.id());
	}

	public explorerLinkForBlock(): string | undefined {
		if (this.blockId()) {
			return this.#coin.link().block(this.blockId()!);
		}

		return undefined;
	}

	public toObject(): Contracts.KeyValuePair {
		return this.#data.toObject();
	}

	public hasPassed(): boolean {
		return this.#data.hasPassed();
	}

	public hasFailed(): boolean {
		return this.#data.hasFailed();
	}

	public getMeta(key: string): Contracts.TransactionDataMeta {
		return this.#data.getMeta(key);
	}

	public setMeta(key: string, value: Contracts.TransactionDataMeta): void {
		return this.#data.setMeta(key, value);
	}

	/**
	 * These methods serve as helpers to aggregate commonly used values.
	 */

	public total(): BigNumber {
		if (this.isSent()) {
			return this.amount().plus(this.fee());
		}

		return this.amount();
	}

	public convertedTotal(): BigNumber {
		return this.convertAmount(this.total().divide(1e8));
	}

	/**
	 * These methods serve as helpers to quickly access entities related to the transaction.
	 *
	 * These are subject to be removed at any time due to them primarily existing for usage
	 * in the Desktop and Mobile Wallet. Use them at your own risk in your own applications.
	 */

	public wallet(): IReadWriteWallet {
		return this.#wallet;
	}

	public coin(): Coins.Coin {
		return this.#coin;
	}

	protected data<T>(): T {
		return (this.#data as unknown) as T;
	}

	private convertAmount(value: BigNumber): BigNumber {
		const timestamp: DateTime | undefined = this.timestamp();

		if (timestamp === undefined) {
			return BigNumber.ZERO;
		}

		return container
			.get<IExchangeRateService>(Identifiers.ExchangeRateService)
			.exchange(this.wallet().currency(), this.wallet().exchangeCurrency(), timestamp, value);
	}
}


export class DelegateRegistrationData extends TransactionData {
	public username(): string {
		return this.data<Contracts.DelegateRegistrationData>().username();
	}
}

export class DelegateResignationData extends TransactionData {}

export class HtlcClaimData extends TransactionData {
	public lockTransactionId(): string {
		return this.data<Contracts.HtlcClaimData>().lockTransactionId();
	}

	public unlockSecret(): string {
		return this.data<Contracts.HtlcClaimData>().unlockSecret();
	}
}

export class HtlcLockData extends TransactionData {
	public secretHash(): string {
		return this.data<Contracts.HtlcLockData>().secretHash();
	}

	public expirationType(): number {
		return this.data<Contracts.HtlcLockData>().expirationType();
	}

	public expirationValue(): number {
		return this.data<Contracts.HtlcLockData>().expirationValue();
	}
}

export class HtlcRefundData extends TransactionData {
	public lockTransactionId(): string {
		return this.data<Contracts.HtlcRefundData>().lockTransactionId();
	}
}

export class IpfsData extends TransactionData {
	public hash(): string {
		return this.data<Contracts.IpfsData>().hash();
	}
}

export class MultiPaymentData extends TransactionData {
	// TODO: expose read-only wallet instances
	public payments(): { recipientId: string; amount: string }[] {
		return this.data<Contracts.MultiPaymentData>().payments();
	}
}

export class MultiSignatureData extends TransactionData {
	// TODO: expose read-only wallet instances
	public publicKeys(): string[] {
		return this.data<Contracts.MultiSignatureData>().publicKeys();
	}

	public min(): number {
		return this.data<Contracts.MultiSignatureData>().min();
	}
}

export class SecondSignatureData extends TransactionData {
	public secondPublicKey(): string {
		return this.data<Contracts.SecondSignatureData>().secondPublicKey();
	}
}

export class TransferData extends TransactionData {
	public memo(): string | undefined {
		return this.data<Contracts.TransferData>().memo();
	}
}

export class VoteData extends TransactionData {
	public votes(): string[] {
		return this.data<Contracts.VoteData>().votes();
	}

	public unvotes(): string[] {
		return this.data<Contracts.VoteData>().unvotes();
	}
}

export type ExtendedTransactionData =
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
