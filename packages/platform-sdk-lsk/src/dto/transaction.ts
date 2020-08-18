import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	// readonly #types = {
	// 	0: "transfer",
	// 	1: "secondSignature",
	// 	2: "delegateRegistration",
	// 	3: "vote",
	// 	4: "multiSignature",
	// };

	// // TODO: remove these once live/beta handling is properly implemented
	// readonly #betanetTypes = {
	// 	8: "transfer",
	// 	9: "secondSignature",
	// 	10: "delegateRegistration",
	// 	11: "vote",
	// 	12: "multiSignature",
	// };

	public id(): string {
		return this.data.id;
	}

	public blockId(): string | undefined {
		return this.data.blockId;
	}

	public timestamp(): DateTime | undefined {
		// TODO: use a genesis timestamp that matches the network
		return DateTime.make("2016-05-24T17:00:00.000Z").addSeconds(this.data.timestamp);
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
		return [];
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
