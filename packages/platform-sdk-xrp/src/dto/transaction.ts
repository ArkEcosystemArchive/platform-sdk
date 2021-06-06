import { Contracts, DTO, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	@IoC.inject(IoC.BindingType.BigNumberService)
	private readonly bigNumberService!: Services.BigNumberService;

	public id(): string {
		return this.data.hash;
	}

	public blockId(): string | undefined {
		return undefined;
	}

	public timestamp(): DateTime | undefined {
		return DateTime.make(this.data.date);
	}

	public confirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public sender(): string {
		return this.data.Account;
	}

	public recipient(): string {
		return this.data.Destination;
	}

	public recipients(): Contracts.MultiPaymentRecipient[] {
		return [];
	}

	public amount(): BigNumber {
		const value = typeof this.data.Amount === "string" ? this.data.Amount : this.data.Amount.value;
		return this.bigNumberService.make(value).times(BigNumber.powerOfTen(this.decimals!));
	}

	public fee(): BigNumber {
		return this.bigNumberService.make(this.data.Fee).times(BigNumber.powerOfTen(this.decimals!));
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
		return this.data.validated;
	}

	public isSent(): boolean {
		return false;
	}

	public isReceived(): boolean {
		return false;
	}

	public isTransfer(): boolean {
		return this.data.TransactionType === "Payment";
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
