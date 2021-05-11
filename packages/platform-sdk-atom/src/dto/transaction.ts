import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

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

	public recipients(): Contracts.MultiPaymentRecipient[] {
		return [];
	}

	// @ts-ignore
	public amount(): BigNumber {
		const event = this.data.events.find(({ type }) => type === "transfer");
		const attribute = event.attributes.find(({ key }) => key === "amount");

		return BigNumber.make(attribute.value.replace(/\D/g, ""));
	}

	public fee(): BigNumber {
		return BigNumber.make(this.data.gas_used);
	}

	public memo(): string | undefined {
		return this.data.tx.value.memo;
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
