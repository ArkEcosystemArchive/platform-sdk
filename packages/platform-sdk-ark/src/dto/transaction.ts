import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { EntityAction, EntityType } from "../enums";

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
			amount: BigNumber.make(payment.amount),
		}));
	}

	public amount(): BigNumber {
		if (this.isMultiPayment()) {
			return this.data.asset.payments.reduce(
				(sum: BigNumber, { amount }: { amount: string }) => sum.plus(amount),
				BigNumber.ZERO,
			);
		}

		return BigNumber.make(this.data.amount);
	}

	public fee(): BigNumber {
		return BigNumber.make(this.data.fee);
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
		if (this.isEntityRegistration()) {
			return true;
		}

		if (this.isEntityResignation()) {
			return true;
		}

		if (this.isEntityUpdate()) {
			return true;
		}

		if (this.isBusinessEntityRegistration()) {
			return true;
		}

		if (this.isBusinessEntityResignation()) {
			return true;
		}

		if (this.isBusinessEntityUpdate()) {
			return true;
		}

		if (this.isProductEntityRegistration()) {
			return true;
		}

		if (this.isProductEntityResignation()) {
			return true;
		}

		if (this.isProductEntityUpdate()) {
			return true;
		}

		if (this.isPluginEntityRegistration()) {
			return true;
		}

		if (this.isPluginEntityResignation()) {
			return true;
		}

		if (this.isPluginEntityUpdate()) {
			return true;
		}

		if (this.isModuleEntityRegistration()) {
			return true;
		}

		if (this.isModuleEntityResignation()) {
			return true;
		}

		if (this.isModuleEntityUpdate()) {
			return true;
		}

		if (this.isDelegateEntityRegistration()) {
			return true;
		}

		if (this.isDelegateEntityResignation()) {
			return true;
		}

		if (this.isDelegateEntityUpdate()) {
			return true;
		}

		if (this.isLegacyBusinessRegistration()) {
			return true;
		}

		if (this.isLegacyBusinessResignation()) {
			return true;
		}

		if (this.isLegacyBusinessUpdate()) {
			return true;
		}

		if (this.isLegacyBridgechainRegistration()) {
			return true;
		}

		if (this.isLegacyBridgechainResignation()) {
			return true;
		}

		if (this.isLegacyBridgechainUpdate()) {
			return true;
		}

		return false;
	}

	private isEntityRegistration(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 6 && this.data.asset.action === EntityAction.Register;
	}

	private isEntityResignation(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 6 && this.data.asset.action === EntityAction.Resign;
	}

	private isEntityUpdate(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 6 && this.data.asset.action === EntityAction.Update;
	}

	private isBusinessEntityRegistration(): boolean {
		return this.isEntityRegistration() && this.data.asset.type === EntityType.Business;
	}

	private isBusinessEntityResignation(): boolean {
		return this.isEntityResignation() && this.data.asset.type === EntityType.Business;
	}

	private isBusinessEntityUpdate(): boolean {
		return this.isEntityUpdate() && this.data.asset.type === EntityType.Business;
	}

	private isProductEntityRegistration(): boolean {
		return this.isEntityRegistration() && this.data.asset.type === EntityType.Product;
	}

	private isProductEntityResignation(): boolean {
		return this.isEntityResignation() && this.data.asset.type === EntityType.Product;
	}

	private isProductEntityUpdate(): boolean {
		return this.isEntityUpdate() && this.data.asset.type === EntityType.Product;
	}

	private isPluginEntityRegistration(): boolean {
		return this.isEntityRegistration() && this.data.asset.type === EntityType.Plugin;
	}

	private isPluginEntityResignation(): boolean {
		return this.isEntityResignation() && this.data.asset.type === EntityType.Plugin;
	}

	private isPluginEntityUpdate(): boolean {
		return this.isEntityUpdate() && this.data.asset.type === EntityType.Plugin;
	}

	private isModuleEntityRegistration(): boolean {
		return this.isEntityRegistration() && this.data.asset.type === EntityType.Module;
	}

	private isModuleEntityResignation(): boolean {
		return this.isEntityResignation() && this.data.asset.type === EntityType.Module;
	}

	private isModuleEntityUpdate(): boolean {
		return this.isEntityUpdate() && this.data.asset.type === EntityType.Module;
	}

	private isDelegateEntityRegistration(): boolean {
		return this.isEntityRegistration() && this.data.asset.type === EntityType.Delegate;
	}

	private isDelegateEntityResignation(): boolean {
		return this.isEntityResignation() && this.data.asset.type === EntityType.Delegate;
	}

	private isDelegateEntityUpdate(): boolean {
		return this.isEntityUpdate() && this.data.asset.type === EntityType.Delegate;
	}

	private isLegacyBusinessRegistration(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 0;
	}

	private isLegacyBusinessResignation(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 1;
	}

	private isLegacyBusinessUpdate(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 2;
	}

	private isLegacyBridgechainRegistration(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 3;
	}

	private isLegacyBridgechainResignation(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 4;
	}

	private isLegacyBridgechainUpdate(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 5;
	}
}
