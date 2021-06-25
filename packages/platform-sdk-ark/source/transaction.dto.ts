import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { TransactionTypeService } from "./transaction-type.service";

@IoC.injectable()
export class ConfirmedTransactionData extends DTO.AbstractConfirmedTransactionData
{
	public override id(): string {
		return this.data.id;
	}

	public override blockId(): string | undefined {
		return this.data.blockId;
	}

	public override timestamp(): DateTime | undefined {
		return DateTime.fromUnix(this.data.timestamp.unix);
	}

	public override confirmations(): BigNumber {
		return BigNumber.make(this.data.confirmations);
	}

	public override sender(): string {
		return this.data.sender;
	}

	public override recipient(): string {
		return this.data.recipient;
	}

	public override recipients(): Contracts.MultiPaymentRecipient[] {
		if (!this.isMultiPayment()) {
			return [];
		}

		return this.data.asset.payments.map((payment: { recipientId: string; amount: BigNumber }) => ({
			address: payment.recipientId,
			amount: this.bigNumberService.make(payment.amount),
		}));
	}

	public override amount(): BigNumber {
		if (this.isMultiPayment()) {
			const amount = BigNumber.sum(this.data.asset.payments.map(({ amount }) => amount));
			return this.bigNumberService.make(amount);
		}

		return this.bigNumberService.make(this.data.amount);
	}

	public override fee(): BigNumber {
		return this.bigNumberService.make(this.data.fee);
	}

	public override asset(): Record<string, unknown> {
		return this.data.asset || {};
	}

	public override isSent(): boolean {
		return [this.getMeta("address"), this.getMeta("publicKey")].includes(this.sender());
	}

	public override isReceived(): boolean {
		return [this.getMeta("address"), this.getMeta("publicKey")].includes(this.recipient());
	}

	public override isTransfer(): boolean {
		return TransactionTypeService.isTransfer(this.data);
	}

	public override isSecondSignature(): boolean {
		return TransactionTypeService.isSecondSignature(this.data);
	}

	public override isDelegateRegistration(): boolean {
		return TransactionTypeService.isDelegateRegistration(this.data);
	}

	public override isVoteCombination(): boolean {
		return TransactionTypeService.isVoteCombination(this.data);
	}

	public override isVote(): boolean {
		return TransactionTypeService.isVote(this.data);
	}

	public override isUnvote(): boolean {
		return TransactionTypeService.isUnvote(this.data);
	}

	public override isMultiSignatureRegistration(): boolean {
		return TransactionTypeService.isMultiSignatureRegistration(this.data);
	}

	public override isIpfs(): boolean {
		return TransactionTypeService.isIpfs(this.data);
	}

	public override isMultiPayment(): boolean {
		return TransactionTypeService.isMultiPayment(this.data);
	}

	public override isDelegateResignation(): boolean {
		return TransactionTypeService.isDelegateResignation(this.data);
	}

	public override isHtlcLock(): boolean {
		return TransactionTypeService.isHtlcLock(this.data);
	}

	public override isHtlcClaim(): boolean {
		return TransactionTypeService.isHtlcClaim(this.data);
	}

	public override isHtlcRefund(): boolean {
		return TransactionTypeService.isHtlcRefund(this.data);
	}

	public override isMagistrate(): boolean {
		return TransactionTypeService.isMagistrate(this.data);
	}

	// Delegate Registration
	public override username(): string {
		return this.data.asset.delegate.username;
	}

	// Transfer
	public override memo(): string | undefined {
		return this.data.vendorField;
	}

	// Vote
	public override votes(): string[] {
		return this.data.asset.votes
			.filter((vote: string) => vote.startsWith("+"))
			.map((publicKey: string) => publicKey.substr(1));
	}

	public override unvotes(): string[] {
		return this.data.asset.votes
			.filter((vote: string) => vote.startsWith("-"))
			.map((publicKey: string) => publicKey.substr(1));
	}

	// Second-Signature Registration
	public override secondPublicKey(): string {
		return this.data.asset.signature.publicKey;
	}

	// Multi-Signature Registration
	public override publicKeys(): string[] {
		return this.data.asset.multiSignature.publicKeys;
	}

	public override min(): number {
		return this.data.asset.multiSignature.min;
	}

	// Multi-Payment
	public override payments(): { recipientId: string; amount: BigNumber }[] {
		return this.data.asset.payments.map((payment: { recipientId: string; amount: BigNumber }) => ({
			address: payment.recipientId,
			amount: this.bigNumberService.make(payment.amount),
		}));
	}

	// IPFS
	public override hash(): string {
		return this.data.asset.ipfs;
	}

	// HTLC Claim / Refund
	public override lockTransactionId(): string {
		if (this.isHtlcRefund()) {
			return this.data.asset.refund.lockTransactionId;
		}

		return this.data.asset.lock.lockTransactionId;
	}

	// HTLC Claim
	public override unlockSecret(): string {
		return this.data.asset.lock.unlockSecret;
	}

	// HTLC Lock
	public override secretHash(): string {
		return this.data.asset.lock.secretHash;
	}

	public override expirationType(): number {
		return this.data.asset.lock.expiration.type;
	}

	public override expirationValue(): number {
		return this.data.asset.lock.expiration.value;
	}
}
