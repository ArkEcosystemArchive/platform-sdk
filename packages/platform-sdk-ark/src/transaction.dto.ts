import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.id;
	}

	public blockId(): string | undefined {
		return this.data.blockId;
	}

	public timestamp(): DateTime | undefined {
		return DateTime.fromUnix(this.data.timestamp.unix);
	}

	public confirmations(): BigNumber {
		return BigNumber.make(this.data.confirmations);
	}

	public sender(): string {
		return this.data.sender;
	}

	public recipient(): string {
		return this.data.recipient;
	}

	public recipients(): Contracts.MultiPaymentRecipient[] {
		if (!this.isMultiPayment()) {
			return [];
		}

		return this.data.asset.payments.map((payment: { recipientId: string; amount: string }) => ({
			address: payment.recipientId,
			amount: this.bigNumberService.make(payment.amount),
		}));
	}

	public amount(): BigNumber {
		if (this.isMultiPayment()) {
			const amount = BigNumber.sum(this.data.asset.payments.map(({ amount }) => amount));
			return this.bigNumberService.make(amount);
		}

		return this.bigNumberService.make(this.data.amount);
	}

	public fee(): BigNumber {
		return this.bigNumberService.make(this.data.fee);
	}

	public asset(): Record<string, unknown> {
		return this.data.asset;
	}

	public inputs(): Contracts.UnspentTransactionData[] {
		return [];
	}

	public outputs(): Contracts.UnspentTransactionData[] {
		return [];
	}

	public isConfirmed(): boolean {
		return this.confirmations().isGreaterThanOrEqualTo(51);
	}

	public isSent(): boolean {
		return [this.getMeta("address"), this.getMeta("publicKey")].includes(this.sender());
	}

	public isReceived(): boolean {
		return [this.getMeta("address"), this.getMeta("publicKey")].includes(this.recipient());
	}

	public isTransfer(): boolean {
		return this.data.typeGroup === 1 && this.data.type === 0;
	}

	public isSecondSignature(): boolean {
		return this.data.typeGroup === 1 && this.data.type === 1;
	}

	public isDelegateRegistration(): boolean {
		return this.data.typeGroup === 1 && this.data.type === 2;
	}

	public isVoteCombination(): boolean {
		return this.isVote() && this.isUnvote();
	}

	public isVote(): boolean {
		const isVote = this.data.typeGroup === 1 && this.data.type === 3;

		if (!isVote) {
			return false;
		}

		return (this.asset().votes as string[]).some((vote) => vote.startsWith("+"));
	}

	public isUnvote(): boolean {
		const isVote = this.data.typeGroup === 1 && this.data.type === 3;

		if (!isVote) {
			return false;
		}

		return (this.asset().votes as string[]).some((vote) => vote.startsWith("-"));
	}

	public isMultiSignature(): boolean {
		return this.data.typeGroup === 1 && this.data.type === 4;
	}

	public isIpfs(): boolean {
		return this.data.typeGroup === 1 && this.data.type === 5;
	}

	public isMultiPayment(): boolean {
		return this.data.typeGroup === 1 && this.data.type === 6;
	}

	public isDelegateResignation(): boolean {
		return this.data.typeGroup === 1 && this.data.type === 7;
	}

	public isHtlcLock(): boolean {
		return this.data.typeGroup === 1 && this.data.type === 8;
	}

	public isHtlcClaim(): boolean {
		return this.data.typeGroup === 1 && this.data.type === 9;
	}

	public isHtlcRefund(): boolean {
		return this.data.typeGroup === 1 && this.data.type === 10;
	}

	public isMagistrate(): boolean {
		return this.data.typeGroup === 2;
	}
}
