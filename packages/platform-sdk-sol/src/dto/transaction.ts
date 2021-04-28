import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.hash;
	}

	public blockId(): string | undefined {
		return undefined;
	}

	public timestamp(): DateTime {
		return DateTime.make(this.data.includedAt);
	}

	public confirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public sender(): string {
		return this.data.inputs[0].address;
	}

	public recipient(): string {
		return this.recipients()[0].address;
	}

	public recipients(): Contracts.MultiPaymentRecipient[] {
		return this.data.outputs
			.sort((a, b) => a.index - b.index)
			.map((out) => ({
				address: out.address,
				amount: BigNumber.make(out.value),
			}));
	}

	public inputs(): Contracts.UnspentTransactionData[] {
		return this.data.inputs.map(
			(input: Contracts.KeyValuePair) =>
				new DTO.UnspentTransactionData({
					id: input.sourceTransaction.hash,
					amount: BigNumber.make(input.value),
					addresses: [input.address],
				}),
		);
	}

	public outputs(): Contracts.UnspentTransactionData[] {
		return this.data.outputs.map(
			(output: Contracts.KeyValuePair) =>
				new DTO.UnspentTransactionData({
					amount: BigNumber.make(output.value),
					addresses: [output.address],
				}),
		);
	}

	public amount(): BigNumber {
		const totalInput = this.data.inputs
			.map((input: Contracts.KeyValuePair) => BigNumber.make(input.value))
			.reduce((a, b) => a.plus(b), BigNumber.ZERO);

		const changeOutput =
			this.data.outputs <= 1
				? BigNumber.ZERO
				: BigNumber.make(
						this.data.outputs.sort((a, b) => a.index - b.index)[this.data.outputs.length - 1].value,
				  );

		return totalInput.minus(changeOutput).minus(this.fee());
	}

	public fee(): BigNumber {
		return BigNumber.make(this.data.fee);
	}

	public asset(): Record<string, unknown> {
		return {};
	}

	public isConfirmed(): boolean {
		return false;
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

	public isEntityRegistration(): boolean {
		return false;
	}

	public isEntityResignation(): boolean {
		return false;
	}

	public isEntityUpdate(): boolean {
		return false;
	}

	public isBusinessEntityRegistration(): boolean {
		return false;
	}

	public isBusinessEntityResignation(): boolean {
		return false;
	}

	public isBusinessEntityUpdate(): boolean {
		return false;
	}

	public isProductEntityRegistration(): boolean {
		return false;
	}

	public isProductEntityResignation(): boolean {
		return false;
	}

	public isProductEntityUpdate(): boolean {
		return false;
	}

	public isPluginEntityRegistration(): boolean {
		return false;
	}

	public isPluginEntityResignation(): boolean {
		return false;
	}

	public isPluginEntityUpdate(): boolean {
		return false;
	}

	public isModuleEntityRegistration(): boolean {
		return false;
	}

	public isModuleEntityResignation(): boolean {
		return false;
	}

	public isModuleEntityUpdate(): boolean {
		return false;
	}

	public isDelegateEntityRegistration(): boolean {
		return false;
	}

	public isDelegateEntityResignation(): boolean {
		return false;
	}

	public isDelegateEntityUpdate(): boolean {
		return false;
	}

	public isLegacyBusinessRegistration(): boolean {
		return false;
	}

	public isLegacyBusinessResignation(): boolean {
		return false;
	}

	public isLegacyBusinessUpdate(): boolean {
		return false;
	}

	public isLegacyBridgechainRegistration(): boolean {
		return false;
	}

	public isLegacyBridgechainResignation(): boolean {
		return false;
	}

	public isLegacyBridgechainUpdate(): boolean {
		return false;
	}
}
