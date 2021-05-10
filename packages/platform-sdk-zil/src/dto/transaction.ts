import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { convertQaToZil } from "../zilliqa";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.id;
	}

	public blockId(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.blockId.name);
	}

	public timestamp(): DateTime {
		throw new Exceptions.NotImplemented(this.constructor.name, this.timestamp.name);
	}

	public confirmations(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, this.confirmations.name);
	}

	public sender(): string {
		return this.data.sender;
	}

	public recipient(): string {
		return this.data.recipient;
	}

	public recipients(): Contracts.MultiPaymentRecipient[] {
		return [{ address: this.recipient(), amount: this.amount() }];
	}

	public inputs(): Contracts.UnspentTransactionData[] {
		throw new Exceptions.NotImplemented(this.constructor.name, this.inputs.name);
	}

	public outputs(): Contracts.UnspentTransactionData[] {
		throw new Exceptions.NotImplemented(this.constructor.name, this.outputs.name);
	}

	public amount(): BigNumber {
		return BigNumber.make(convertQaToZil(this.data.amount));
	}

	public fee(): BigNumber {
		return BigNumber.make(convertQaToZil(this.data.gasUsed)).times(convertQaToZil(this.data.gasPrice));
	}

	public asset(): Record<string, unknown> {
		return {};
	}

	public isConfirmed(): boolean {
		return this.data.isConfirmed;
	}

	public isSent(): boolean {
		return this.data.isSent;
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
