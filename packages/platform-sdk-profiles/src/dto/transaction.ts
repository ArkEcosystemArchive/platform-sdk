import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class TransactionData implements Contracts.TransactionData {
	readonly #coin: Coins.Coin;
	readonly #data: Contracts.TransactionDataType;

	public constructor(coin: Coins.Coin, data: Contracts.TransactionDataType) {
		this.#coin = coin;
		this.#data = data;
	}

	public id(): string {
		return this.#data.id();
	}

	public blockId(): string | undefined {
		return this.#data.blockId();
	}

	public type(): string {
		return this.#data.type();
	}

	public timestamp(): DateTime | undefined {
		return this.#data.timestamp();
	}

	public confirmations(): BigNumber {
		return this.#data.confirmations();
	}

	public sender(): string {
		return this.#data.sender();
	}

	public recipient(): string {
		return this.#data.recipient();
	}

	public recipients(): MultiPaymentRecipient[] {
		return this.#data.recipients();
	}

	public amount(): BigNumber {
		return this.#data.amount();
	}

	public fee(): BigNumber {
		return this.#data.fee();
	}

	public memo(): string | undefined {
		return this.#data.memo();
	}

	public asset(): Record<string, unknown> {
		return this.#data.asset();
	}

	public isConfirmed(): boolean {
		return this.#data.isConfirmed();
	}

	public isSent(): boolean {
		return this.#data.isSent();
	}

	public isReceived(): boolean {
		return this.#data.isReceived();
	}

	public isTransfer(): boolean {
		return this.#data.isTransfer();
	}

	public isSecondSignature(): boolean {
		return this.#data.isSecondSignature();
	}

	public isDelegateRegistration(): boolean {
		return this.#data.isDelegateRegistration();
	}

	public isVote(): boolean {
		return this.#data.isVote();
	}

	public isUnvote(): boolean {
		return this.#data.isUnvote();
	}

	public isMultiSignature(): boolean {
		return this.#data.isMultiSignature();
	}

	public isIpfs(): boolean {
		return this.#data.isIpfs();
	}

	public isMultiPayment(): boolean {
		return this.#data.isMultiPayment();
	}

	public isDelegateResignation(): boolean {
		return this.#data.isDelegateResignation();
	}

	public isHtlcLock(): boolean {
		return this.#data.isHtlcLock();
	}

	public isHtlcClaim(): boolean {
		return this.#data.isHtlcClaim();
	}

	public isHtlcRefund(): boolean {
		return this.#data.isHtlcRefund();
	}

	public isEntityRegistration(): boolean {
		return this.#data.isEntityRegistration();
	}

	public isEntityResignation(): boolean {
		return this.#data.isEntityResignation();
	}

	public isEntityUpdate(): boolean {
		return this.#data.isEntityUpdate();
	}

	public isBusinessEntityRegistration(): boolean {
		return this.#data.isBusinessEntityRegistration();
	}

	public isBusinessEntityResignation(): boolean {
		return this.#data.isBusinessEntityResignation();
	}

	public isBusinessEntityUpdate(): boolean {
		return this.#data.isBusinessEntityUpdate();
	}

	public isDeveloperEntityRegistration(): boolean {
		return this.#data.isDeveloperEntityRegistration();
	}

	public isDeveloperEntityResignation(): boolean {
		return this.#data.isDeveloperEntityResignation();
	}

	public isDeveloperEntityUpdate(): boolean {
		return this.#data.isDeveloperEntityUpdate();
	}

	public isCorePluginEntityRegistration(): boolean {
		return this.#data.isCorePluginEntityRegistration();
	}

	public isCorePluginEntityResignation(): boolean {
		return this.#data.isCorePluginEntityResignation();
	}

	public isCorePluginEntityUpdate(): boolean {
		return this.#data.isCorePluginEntityUpdate();
	}

	public isDesktopPluginEntityRegistration(): boolean {
		return this.#data.isDesktopPluginEntityRegistration();
	}

	public isDesktopPluginEntityResignation(): boolean {
		return this.#data.isDesktopPluginEntityResignation();
	}

	public isDesktopPluginEntityUpdate(): boolean {
		return this.#data.isDesktopPluginEntityUpdate();
	}

	public isDelegateEntityRegistration(): boolean {
		return this.#data.isDelegateEntityRegistration();
	}

	public isDelegateEntityResignation(): boolean {
		return this.#data.isDelegateEntityResignation();
	}

	public isDelegateEntityUpdate(): boolean {
		return this.#data.isDelegateEntityUpdate();
	}

	public isLegacyBusinessRegistration(): boolean {
		return this.#data.isLegacyBusinessRegistration();
	}

	public isLegacyBusinessResignation(): boolean {
		return this.#data.isLegacyBusinessResignation();
	}

	public isLegacyBusinessUpdate(): boolean {
		return this.#data.isLegacyBusinessUpdate();
	}

	public isLegacyBridgechainRegistration(): boolean {
		return this.#data.isLegacyBridgechainRegistration();
	}

	public isLegacyBridgechainResignation(): boolean {
		return this.#data.isLegacyBridgechainResignation();
	}

	public isLegacyBridgechainUpdate(): boolean {
		return this.#data.isLegacyBridgechainUpdate();
	}

	// This is a link for the explorer of the respective coin and network.
	public link(): string {
		return this.#coin.link().transaction(this.id());
	}

	public toObject(): Contracts.KeyValuePair {
		return this.#data.toObject();
	}

	public hasPassed(): boolean {
		return this.#data.hasPassed();
	}

	public hasFailed(): boolean {
		return this.#data.hasFailed();
	}

	public getMeta(key: string): Contracts.TransactionDataMeta {
		return this.#data.getMeta(key);
	}

	public setMeta(key: string, value: Contracts.TransactionDataMeta): void {
		return this.#data.setMeta(key, value);
	}

	protected coin(): Coins.Coin {
		return this.#coin;
	}

	protected data<T>(): T {
		return this.#data as T;
	}
}

export class BridgechainRegistrationData extends TransactionData implements Contracts.BridgechainRegistrationData {
	public name(): string {
		return this.data<Contracts.BridgechainRegistrationData>().name();
	}

	public seedNodes(): string[] {
		return this.data<Contracts.BridgechainRegistrationData>().seedNodes();
	}

	public genesisHash(): string {
		return this.data<Contracts.BridgechainRegistrationData>().genesisHash();
	}

	public bridgechainRepository(): string {
		return this.data<Contracts.BridgechainRegistrationData>().bridgechainRepository();
	}

	public bridgechainAssetRepository(): string {
		return this.data<Contracts.BridgechainRegistrationData>().bridgechainAssetRepository();
	}

	public ports(): Record<string, number> {
		return this.data<Contracts.BridgechainRegistrationData>().ports();
	}
}

export class BridgechainResignationData extends TransactionData implements Contracts.BridgechainResignationData {
	public bridgechainId(): string {
		return this.data<Contracts.BridgechainResignationData>().bridgechainId();
	}
}

export class BridgechainUpdateData extends TransactionData implements Contracts.BridgechainUpdateData {
	public name(): string {
		return this.data<Contracts.BridgechainUpdateData>().name();
	}

	public seedNodes(): string[] {
		return this.data<Contracts.BridgechainUpdateData>().seedNodes();
	}

	public bridgechainRepository(): string {
		return this.data<Contracts.BridgechainUpdateData>().bridgechainRepository();
	}

	public bridgechainAssetRepository(): string {
		return this.data<Contracts.BridgechainUpdateData>().bridgechainAssetRepository();
	}

	public ports(): Record<string, number> {
		return this.data<Contracts.BridgechainUpdateData>().ports();
	}
}

export class BusinessRegistrationData extends TransactionData implements Contracts.BusinessRegistrationData {
	public name(): string {
		return this.data<Contracts.BusinessRegistrationData>().name();
	}

	public website(): string {
		return this.data<Contracts.BusinessRegistrationData>().website();
	}

	public vatId(): string {
		return this.data<Contracts.BusinessRegistrationData>().vatId();
	}

	public repository(): string {
		return this.data<Contracts.BusinessRegistrationData>().repository();
	}
}

export class BusinessResignationData extends TransactionData implements Contracts.BusinessResignationData {}

export class BusinessUpdateData extends TransactionData implements Contracts.BusinessUpdateData {
	public name(): string {
		return this.data<Contracts.BusinessUpdateData>().name();
	}

	public website(): string {
		return this.data<Contracts.BusinessUpdateData>().website();
	}

	public vatId(): string {
		return this.data<Contracts.BusinessUpdateData>().vatId();
	}

	public repository(): string {
		return this.data<Contracts.BusinessUpdateData>().repository();
	}
}

export class DelegateRegistrationData extends TransactionData implements Contracts.DelegateRegistrationData {
	public username(): string {
		return this.data<Contracts.DelegateRegistrationData>().username();
	}
}

export class DelegateResignationData extends TransactionData implements Contracts.DelegateResignationData {}

export class EntityRegistrationData extends TransactionData implements Contracts.EntityRegistrationData {
	public entityType(): number {
		return this.data<Contracts.EntityRegistrationData>().entityType();
	}

	public entitySubType(): number {
		return this.data<Contracts.EntityRegistrationData>().entitySubType();
	}

	public entityAction(): number {
		return this.data<Contracts.EntityRegistrationData>().entityAction();
	}

	public name(): string {
		return this.data<Contracts.EntityRegistrationData>().name();
	}

	public ipfs(): string {
		return this.data<Contracts.EntityRegistrationData>().ipfs();
	}
}

export class EntityResignationData extends TransactionData implements Contracts.EntityResignationData {
	public entityType(): number {
		return this.data<Contracts.EntityResignationData>().entityType();
	}

	public entitySubType(): number {
		return this.data<Contracts.EntityResignationData>().entitySubType();
	}

	public entityAction(): number {
		return this.data<Contracts.EntityResignationData>().entityAction();
	}

	public registrationId(): string {
		return this.data<Contracts.EntityResignationData>().registrationId();
	}
}

export class EntityUpdateData extends TransactionData implements Contracts.EntityUpdateData {
	public entityType(): number {
		return this.data<Contracts.EntityUpdateData>().entityType();
	}

	public entitySubType(): number {
		return this.data<Contracts.EntityUpdateData>().entitySubType();
	}

	public entityAction(): number {
		return this.data<Contracts.EntityUpdateData>().entityAction();
	}

	public name(): string | undefined {
		return this.data<Contracts.EntityUpdateData>().name();
	}

	public ipfs(): string | undefined {
		return this.data<Contracts.EntityUpdateData>().ipfs();
	}
}

export class HtlcClaimData extends TransactionData implements Contracts.HtlcClaimData {
	public lockTransactionId(): string {
		return this.data<Contracts.HtlcClaimData>().lockTransactionId();
	}

	public unlockSecret(): string {
		return this.data<Contracts.HtlcClaimData>().unlockSecret();
	}
}

export class HtlcLockData extends TransactionData implements Contracts.HtlcLockData {
	public secretHash(): string {
		return this.data<Contracts.HtlcLockData>().secretHash();
	}

	public expirationType(): number {
		return this.data<Contracts.HtlcLockData>().expirationType();
	}

	public expirationValue(): number {
		return this.data<Contracts.HtlcLockData>().expirationValue();
	}
}

export class HtlcRefundData extends TransactionData implements Contracts.HtlcRefundData {
	public lockTransactionId(): string {
		return this.data<Contracts.HtlcRefundData>().lockTransactionId();
	}
}

export class IpfsData extends TransactionData implements Contracts.IpfsData {
	public hash(): string {
		return this.data<Contracts.IpfsData>().hash();
	}
}

export class MultiPaymentData extends TransactionData implements Contracts.MultiPaymentData {
	// TODO: expose read-only wallet instances
	public payments(): { recipientId: string; amount: string }[] {
		return this.data<Contracts.MultiPaymentData>().payments();
	}
}

export class MultiSignatureData extends TransactionData implements Contracts.MultiSignatureData {
	// TODO: expose read-only wallet instances
	public publicKeys(): string[] {
		return this.data<Contracts.MultiSignatureData>().publicKeys();
	}

	public min(): number {
		return this.data<Contracts.MultiSignatureData>().min();
	}
}

export class SecondSignatureData extends TransactionData implements Contracts.SecondSignatureData {
	public secondPublicKey(): string {
		return this.data<Contracts.SecondSignatureData>().secondPublicKey();
	}
}

export class TransferData extends TransactionData implements Contracts.TransferData {}

export class VoteData extends TransactionData implements Contracts.VoteData {
	// TODO: map those to delegate wallets
	public votes(): string[] {
		return this.data<Contracts.VoteData>().votes();
	}

	// TODO: map those to delegate wallets
	public unvotes(): string[] {
		return this.data<Contracts.VoteData>().unvotes();
	}
}
