import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	readonly #types = {
		1: {
			0: "transfer",
			1: "secondSignature",
			2: "delegateRegistration",
			3: "vote",
			4: "multiSignature",
			5: "ipfs",
			6: "multiPayment",
			7: "delegateResignation",
			8: "htlcLock",
			9: "htlcClaim",
			10: "htlcRefund",
		},
		2: {
			0: "businessRegistration",
			1: "businessResignation",
			2: "businessUpdate",
			3: "bridgechainRegistration",
			4: "bridgechainResignation",
			5: "bridgechainUpdate",
		},
	};

	public id(): string {
		return this.data.id;
	}

	public type(): string {
		return this.#types[this.data.typeGroup][this.data.type];
	}

	public timestamp(): number | undefined {
		return this.data.timestamp.epoch;
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

		return this.data.asset.payments;
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

	public isBusinessRegistration(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 0;
	}

	public isBusinessResignation(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 1;
	}

	public isBusinessUpdate(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 2;
	}

	public isBridgechainRegistration(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 3;
	}

	public isBridgechainResignation(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 4;
	}

	public isBridgechainUpdate(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 5;
	}

	public isEntityRegistration(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 6 && this.data.asset.action === 0;
	}

	public isEntityResignation(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 6 && this.data.asset.action === 1;
	}

	public isEntityUpdate(): boolean {
		return this.data.typeGroup === 2 && this.data.type === 6 && this.data.asset.action === 2;
	}
}
