import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { normalizeTimestamp } from "./timestamps";
import { TransactionTypeService } from "./transaction-type.service";

@IoC.injectable()
export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public id(): string {
		return this.data.id;
	}

	public blockId(): string | undefined {
		return this.data.blockId;
	}

	public timestamp(): DateTime | undefined {
		return normalizeTimestamp(this.data.timestamp);
	}

	public confirmations(): BigNumber {
		return BigNumber.make(this.data.confirmations);
	}

	public sender(): string {
		return this.data.senderId;
	}

	public recipient(): string {
		return this.data.recipientId;
	}

	public amount(): BigNumber {
		return this.bigNumberService.make(this.data.amount);
	}

	public fee(): BigNumber {
		return this.bigNumberService.make(this.data.fee);
	}

	public memo(): string | undefined {
		return this.data.asset.data;
	}

	public isConfirmed(): boolean {
		return this.confirmations().isGreaterThanOrEqualTo(101);
	}

	public isTransfer(): boolean {
		return TransactionTypeService.isTransfer(this.data);
	}

	public isSecondSignature(): boolean {
		return TransactionTypeService.isSecondSignature(this.data);
	}

	public isDelegateRegistration(): boolean {
		return TransactionTypeService.isDelegateRegistration(this.data);
	}

	public isVoteCombination(): boolean {
		return TransactionTypeService.isVoteCombination(this.data);
	}

	public isVote(): boolean {
		return TransactionTypeService.isVote(this.data);
	}

	public isUnvote(): boolean {
		return TransactionTypeService.isUnvote(this.data);
	}

	public isMultiSignatureRegistration(): boolean {
		return TransactionTypeService.isMultiSignatureRegistration(this.data);
	}
}
