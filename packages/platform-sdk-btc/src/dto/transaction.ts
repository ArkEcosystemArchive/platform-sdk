import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.txid;
	}

	public blockId(): string | undefined {
		return undefined;
	}

	public timestamp(): DateTime | undefined {
		return DateTime.make(this.data.blockTime);
	}

	public confirmations(): BigNumber {
		return BigNumber.make(this.data.confirmations);
	}

	public sender(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "sender");
	}

	public recipient(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "recipient");
	}

	public recipients(): Contracts.MultiPaymentRecipient[] {
		return [];
	}

	public amount(): BigNumber {
		return BigNumber.make(this.data.value);
	}

	public fee(): BigNumber {
		return BigNumber.make(this.data.fee);
	}

	public memo(): string | undefined {
		return undefined;
	}

	public asset(): Record<string, unknown> {
		return {};
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

	public isDeveloperEntityRegistration(): boolean {
		return false;
	}

	public isDeveloperEntityResignation(): boolean {
		return false;
	}

	public isDeveloperEntityUpdate(): boolean {
		return false;
	}

	public isCorePluginEntityRegistration(): boolean {
		return false;
	}

	public isCorePluginEntityResignation(): boolean {
		return false;
	}

	public isCorePluginEntityUpdate(): boolean {
		return false;
	}

	public isDesktopPluginEntityRegistration(): boolean {
		return false;
	}

	public isDesktopPluginEntityResignation(): boolean {
		return false;
	}

	public isDesktopPluginEntityUpdate(): boolean {
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
