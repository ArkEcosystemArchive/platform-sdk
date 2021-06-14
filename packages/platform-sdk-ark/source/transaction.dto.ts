import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { TransactionTypeService } from "./transaction-type.service";

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
		return this.data.asset || {};
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
		return TransactionTypeService.isTransfer(this.data);
	}

	public isSecondSignature(): boolean {
		return TransactionTypeService.isSecondSignature(this.data);
	}

	public isDelegateRegistration(): boolean {
		return TransactionTypeService.isDelegateRegistration(this.data);
	}

	public isVoteCombination(): boolean {
		return TransactionTypeService.isVoteCombination(this.data);
	}

	public isVote(): boolean {
		return TransactionTypeService.isVote(this.data);
	}

	public isUnvote(): boolean {
		return TransactionTypeService.isUnvote(this.data);
	}

	public isMultiSignatureRegistration(): boolean {
		return TransactionTypeService.isMultiSignatureRegistration(this.data);
	}

	public isIpfs(): boolean {
		return TransactionTypeService.isIpfs(this.data);
	}

	public isMultiPayment(): boolean {
		return TransactionTypeService.isMultiPayment(this.data);
	}

	public isDelegateResignation(): boolean {
		return TransactionTypeService.isDelegateResignation(this.data);
	}

	public isHtlcLock(): boolean {
		return TransactionTypeService.isHtlcLock(this.data);
	}

	public isHtlcClaim(): boolean {
		return TransactionTypeService.isHtlcClaim(this.data);
	}

	public isHtlcRefund(): boolean {
		return TransactionTypeService.isHtlcRefund(this.data);
	}

	public isMagistrate(): boolean {
		return TransactionTypeService.isMagistrate(this.data);
	}
}
