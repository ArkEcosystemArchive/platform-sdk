import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { normalizeTimestamp } from "./timestamps";
import { TransactionTypeService } from "./transaction-type.service";

@IoC.injectable()
export class TransactionData extends DTO.AbstractTransactionData implements Contracts.TransactionData {
	public override id(): string {
		return this.data.id;
	}

	public override blockId(): string | undefined {
		return this.data.blockId;
	}

	public override timestamp(): DateTime | undefined {
		return normalizeTimestamp(this.data.timestamp);
	}

	public override confirmations(): BigNumber {
		return BigNumber.make(this.data.confirmations);
	}

	public override sender(): string {
		return this.data.senderId;
	}

	public override recipient(): string {
		return this.data.recipientId;
	}

	public override amount(): BigNumber {
		return this.bigNumberService.make(this.data.amount);
	}

	public override fee(): BigNumber {
		return this.bigNumberService.make(this.data.fee);
	}

	public override memo(): string | undefined {
		return this.data.asset.data;
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
}
