import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.hash;
	}

	public blockId(): string | undefined {
		return this.data.hash;
	}

	public timestamp(): DateTime {
		return DateTime.fromUnix(this.data.local_timestamp);
	}

	public confirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public sender(): string {
		if (this.isSent()) {
			return this.data._origin;
		}

		return this.data.account;
	}

	public recipient(): string {
		if (this.isReceived()) {
			return this.data._origin;
		}

		return this.data.account;
	}

	public recipients(): Contracts.MultiPaymentRecipient[] {
		return [];
	}

	public inputs(): Contracts.UnspentTransactionData[] {
		return [];
	}

	public outputs(): Contracts.UnspentTransactionData[] {
		return [];
	}

	public amount(): BigNumber {
		return BigNumber.make(this.data.amount, this.decimals).divide(1e30).times(1e8);
	}

	public fee(): BigNumber {
		return BigNumber.ZERO;
	}

	public asset(): Record<string, unknown> {
		return {};
	}

	public isConfirmed(): boolean {
		return true;
	}

	public isSent(): boolean {
		return this.data.type === "send";
	}

	public isReceived(): boolean {
		return this.data.type === "receive";
	}

	public isTransfer(): boolean {
		return true;
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
