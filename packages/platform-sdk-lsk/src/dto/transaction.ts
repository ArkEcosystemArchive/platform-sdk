import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	readonly #types = {
		8: "transfer",
		9: "secondSignature",
		10: "delegateRegistration",
		11: "vote",
		12: "multiSignature",
	};

	public id(): string {
		return this.data.id;
	}

	public type(): string {
		return this.#types[this.data.type];
	}

	public timestamp(): number | undefined {
		return this.data.timestamp;
	}

	public confirmations(): BigNumber {
		return BigNumber.make(this.data.confirmations);
	}

	public sender(): string {
		return this.data.senderPublicKey;
	}

	public recipient(): string {
		return this.data.recipientId;
	}

	public recipients(): Contracts.MultiPaymentRecipient[] {
		return [{ address: this.recipient(), amount: this.amount() }];
	}

	public amount(): BigNumber {
		return BigNumber.make(this.data.amount);
	}

	public fee(): BigNumber {
		return BigNumber.make(this.data.fee);
	}

	public memo(): string | undefined {
		return this.data.asset.data;
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
		return this.data.type === 8;
	}

	public isSecondSignature(): boolean {
		return this.data.type === 9;
	}

	public isDelegateRegistration(): boolean {
		return this.data.type === 10;
	}

	public isVote(): boolean {
		if (this.data.type !== 11) {
			return false;
		}

		for (const vote of this.asset().votes as string[]) {
			if (vote.startsWith("+")) {
				return true;
			}
		}

		return false;
	}

	public isUnvote(): boolean {
		if (this.data.type !== 11) {
			return false;
		}

		for (const vote of this.asset().votes as string[]) {
			if (vote.startsWith("-")) {
				return true;
			}
		}

		return false;
	}

	public isMultiSignature(): boolean {
		return this.data.type === 12;
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

	public isBusinessRegistration(): boolean {
		return false;
	}

	public isBusinessResignation(): boolean {
		return false;
	}

	public isBusinessUpdate(): boolean {
		return false;
	}

	public isBridgechainRegistration(): boolean {
		return false;
	}

	public isBridgechainResignation(): boolean {
		return false;
	}

	public isBridgechainUpdate(): boolean {
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
}
