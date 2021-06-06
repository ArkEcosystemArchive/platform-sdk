import { Contracts, DTO, IoC, Services } from "@arkecosystem/platform-sdk";
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
		return this.data.miniBlockHash;
	}

	public timestamp(): DateTime {
		return DateTime.fromUnix(this.data.timestamp);
	}

	public confirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public sender(): string {
		return this.data.sender;
	}

	public recipient(): string {
		return this.data.receiver;
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
		return this.bigNumberService.make(this.data.value);
	}

	public fee(): BigNumber {
		return this.bigNumberService.make(this.data.gasUsed).times(this.data.gasPrice);
	}

	public asset(): Record<string, unknown> {
		return {};
	}

	public isConfirmed(): boolean {
		return this.data.status === "success";
	}

	public isSent(): boolean {
		// @TODO: Need to find a way to determine this
		return false;
	}

	public isReceived(): boolean {
		// @TODO: Need to find a way to determine this
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
