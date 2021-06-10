import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.txhash;
	}

	public blockId(): string | undefined {
		return undefined;
	}

	public timestamp(): DateTime | undefined {
		return DateTime.make(this.data.timestamp);
	}

	public confirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public sender(): string {
		const event = this.data.events.find(({ type }) => type === "message");
		const attribute = event.attributes.find(({ key }) => key === "sender");

		return attribute.value;
	}

	public recipient(): string {
		const event = this.data.events.find(({ type }) => type === "transfer");
		const attribute = event.attributes.find(({ key }) => key === "recipient");

		return attribute.value;
	}

	// @ts-ignore
	public amount(): BigNumber {
		const event = this.data.events.find(({ type }) => type === "transfer");
		const attribute = event.attributes.find(({ key }) => key === "amount");

		return this.bigNumberService.make(attribute.value.replace(/\D/g, ""));
	}

	public fee(): BigNumber {
		return this.bigNumberService.make(this.data.gas_used);
	}

	public memo(): string | undefined {
		return this.data.tx.value.memo;
	}

	public outputs(): Contracts.UnspentTransactionData[] {
		return [];
	}

	public isConfirmed(): boolean {
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
