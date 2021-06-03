import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.id;
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
		return Object.keys(this.data.inputTotals)[0];
	}

	public recipient(): string {
		return Object.keys(this.data.outputTotals)[0];
	}

	public recipients(): Contracts.MultiPaymentRecipient[] {
		return [];
	}

	public amount(): BigNumber {
		return BigNumber.make(Object.values(this.data.outputTotals)[0] as string, this.decimals);
	}

	public fee(): BigNumber {
		return BigNumber.make(this.data.txFee, this.decimals);
	}

	public asset(): Record<string, unknown> {
		return {};
	}

	public inputs(): Contracts.UnspentTransactionData[] {
		return this.data.inputs.map(
			(input: Contracts.KeyValuePair) =>
				new DTO.UnspentTransactionData({
					id: input.transactionID,
					timestamp: DateTime.make(input.timestamp),
					amount: BigNumber.make(input.amount, this.decimals),
					addresses: input.addresses,
				}),
		);
	}

	public outputs(): Contracts.UnspentTransactionData[] {
		return this.data.outputs.map(
			(output: Contracts.KeyValuePair) =>
				new DTO.UnspentTransactionData({
					id: output.transactionID,
					timestamp: DateTime.make(output.timestamp),
					amount: BigNumber.make(output.amount, this.decimals),
					addresses: output.addresses,
				}),
		);
	}

	public isConfirmed(): boolean {
		return true;
	}

	public isSent(): boolean {
		return false;
	}

	public isReceived(): boolean {
		return false;
	}

	public isTransfer(): boolean {
		return this.data.type === "base";
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
