import { Enums } from "@arkecosystem/core-magistrate-crypto";
import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

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

	public memo(): string | undefined {
		return this.data.vendorField;
	}

	public asset(): Record<string, unknown> {
		return this.data.asset;
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

	public isVote(): boolean {
		const isVote = this.data.typeGroup === 1 && this.data.type === 3;

		if (!isVote) {
			return false;
		}

		return (this.asset().votes as string[])[0].startsWith("+");
	}

	public isUnvote(): boolean {
		const isVote = this.data.typeGroup === 1 && this.data.type === 3;

		if (!isVote) {
			return false;
		}

		return (this.asset().votes as string[])[0].startsWith("-");
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
		return (
			this.isEntityRegistration() &&
			this.data.asset.type === Enums.EntityType.Business &&
			this.data.asset.subType === Enums.EntitySubType.None
		);
	}

	public isBusinessEntityResignation(): boolean {
		return (
			this.isEntityResignation() &&
			this.data.asset.type === Enums.EntityType.Business &&
			this.data.asset.subType === Enums.EntitySubType.None
		);
	}

	public isBusinessEntityUpdate(): boolean {
		return (
			this.isEntityUpdate() &&
			this.data.asset.type === Enums.EntityType.Business &&
			this.data.asset.subType === Enums.EntitySubType.None
		);
	}

	public isDeveloperEntityRegistration(): boolean {
		return (
			this.isEntityRegistration() &&
			this.data.asset.type === Enums.EntityType.Business &&
			this.data.asset.subType === Enums.EntitySubType.None
		);
	}

	public isDeveloperEntityResignation(): boolean {
		return (
			this.isEntityResignation() &&
			this.data.asset.type === Enums.EntityType.Business &&
			this.data.asset.subType === Enums.EntitySubType.None
		);
	}

	public isDeveloperEntityUpdate(): boolean {
		return (
			this.isEntityUpdate() &&
			this.data.asset.type === Enums.EntityType.Business &&
			this.data.asset.subType === Enums.EntitySubType.None
		);
	}

	public isCorePluginEntityRegistration(): boolean {
		return (
			this.isEntityRegistration() &&
			this.data.asset.type === Enums.EntityType.Business &&
			this.data.asset.subType === Enums.EntitySubType.PluginCore
		);
	}

	public isCorePluginEntityResignation(): boolean {
		return (
			this.isEntityResignation() &&
			this.data.asset.type === Enums.EntityType.Business &&
			this.data.asset.subType === Enums.EntitySubType.PluginCore
		);
	}

	public isCorePluginEntityUpdate(): boolean {
		return (
			this.isEntityUpdate() &&
			this.data.asset.type === Enums.EntityType.Business &&
			this.data.asset.subType === Enums.EntitySubType.PluginCore
		);
	}

	public isDesktopPluginEntityRegistration(): boolean {
		return (
			this.isEntityRegistration() &&
			this.data.asset.type === Enums.EntityType.Business &&
			this.data.asset.subType === Enums.EntitySubType.PluginDesktop
		);
	}

	public isDesktopPluginEntityResignation(): boolean {
		return (
			this.isEntityResignation() &&
			this.data.asset.type === Enums.EntityType.Business &&
			this.data.asset.subType === Enums.EntitySubType.PluginDesktop
		);
	}

	public isDesktopPluginEntityUpdate(): boolean {
		return (
			this.isEntityUpdate() &&
			this.data.asset.type === Enums.EntityType.Business &&
			this.data.asset.subType === Enums.EntitySubType.PluginDesktop
		);
	}

	public isDelegateEntityRegistration(): boolean {
		return (
			this.isEntityRegistration() &&
			this.data.asset.type === Enums.EntityType.Business &&
			this.data.asset.subType === Enums.EntitySubType.None
		);
	}

	public isDelegateEntityResignation(): boolean {
		return (
			this.isEntityResignation() &&
			this.data.asset.type === Enums.EntityType.Business &&
			this.data.asset.subType === Enums.EntitySubType.None
		);
	}

	public isDelegateEntityUpdate(): boolean {
		return (
			this.isEntityUpdate() &&
			this.data.asset.type === Enums.EntityType.Business &&
			this.data.asset.subType === Enums.EntitySubType.None
		);
	}

	public isLegacyBusinessRegistration(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 0;
	}

	public isLegacyBusinessResignation(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 1;
	}

	public isLegacyBusinessUpdate(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 2;
	}

	public isLegacyBridgechainRegistration(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 3;
	}

	public isLegacyBridgechainResignation(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 4;
	}

	public isLegacyBridgechainUpdate(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 5;
	}
}
