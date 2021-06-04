import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { bigNumber } from "../container";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.txid;
	}

	public blockId(): string | undefined {
		return undefined;
	}

	public timestamp(): DateTime | undefined {
		return DateTime.fromUnix(this.data.time);
	}

	public confirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public sender(): string {
		return this.data.address_from;
	}

	public recipient(): string {
		return this.data.address_to;
	}

	public recipients(): Contracts.MultiPaymentRecipient[] {
		return [];
	}

	public amount(): BigNumber {
		return bigNumber(this.data.amount);
	}

	public fee(): BigNumber {
		return BigNumber.ZERO;
	}

	public memo(): string | undefined {
		return undefined;
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
		return false;
	}

	public isSent(): boolean {
		return false;
	}

	public isReceived(): boolean {
		return false;
	}

	public isTransfer(): boolean {
		return false;
	}

	public isSecondSignature(): boolean {
		return false;
	}

	public isDelegateRegistration(): boolean {
		return false;
	}

	public isVoteCombination(): boolean {
		return false;
	}

	public isVote(): boolean {
		return false;
	}

	public isUnvote(): boolean {
		return false;
	}

	public isMultiSignature(): boolean {
		return false;
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
