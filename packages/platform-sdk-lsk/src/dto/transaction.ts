import { Contracts, DTO, IoC, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { normalizeTimestamp } from "./timestamps";

@IoC.injectable()
export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.id;
	}

	public blockId(): string | undefined {
		return this.data.blockId;
	}

	public timestamp(): DateTime | undefined {
		return normalizeTimestamp(this.data.timestamp);
	}

	public confirmations(): BigNumber {
		return BigNumber.make(this.data.confirmations);
	}

	public sender(): string {
		return this.data.senderId;
	}

	public recipient(): string {
		return this.data.recipientId;
	}

	public recipients(): Contracts.MultiPaymentRecipient[] {
		return [];
	}

	public amount(): BigNumber {
		return this.bigNumberService.make(this.data.amount);
	}

	public fee(): BigNumber {
		return this.bigNumberService.make(this.data.fee);
	}

	public memo(): string | undefined {
		return this.data.asset.data;
	}

	public asset(): Record<string, unknown> {
		return {};
	}

	public inputs(): Contracts.UnspentTransactionData[] {
		return [];
	}

	public outputs(): Contracts.UnspentTransactionData[] {
		return [];
	}

	public isConfirmed(): boolean {
		return this.confirmations().isGreaterThanOrEqualTo(101);
	}

	public isSent(): boolean {
		return false;
	}

	public isReceived(): boolean {
		return false;
	}

	public isTransfer(): boolean {
		return this.data.type === 8;
	}

	public isSecondSignature(): boolean {
		return this.data.type === 9;
	}

	public isDelegateRegistration(): boolean {
		return this.data.type === 10;
	}

	public isVoteCombination(): boolean {
		return this.isVote() && this.isUnvote();
	}

	public isVote(): boolean {
		if (this.data.type !== 11) {
			return false;
		}

		return (this.asset().votes as string[]).some((vote) => vote.startsWith("+"));
	}

	public isUnvote(): boolean {
		if (this.data.type !== 11) {
			return false;
		}

		return (this.asset().votes as string[]).some((vote) => vote.startsWith("-"));
	}

	public isMultiSignature(): boolean {
		return this.data.type === 12;
	}

	public isIpfs(): boolean {
		return false;
	}

	public isMultiPayment(): boolean {
		return false;
	}

	public isDelegateResignation(): boolean {
		return false;
	}

	public isHtlcLock(): boolean {
		return false;
	}

	public isHtlcClaim(): boolean {
		return false;
	}

	public isHtlcRefund(): boolean {
		return false;
	}

	public isMagistrate(): boolean {
		return false;
	}
}
