import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { normalizeTimestamp } from "./timestamps";
import { TransactionTypeService } from "./transaction-type.service";

@IoC.injectable()
export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	public override sender(): string {
		return this.signedData.senderId;
	}

	public override recipient(): string {
		return this.signedData.recipientId;
	}

	public override amount(): BigNumber {
		return this.bigNumberService.make(this.signedData.amount);
	}

	public override fee(): BigNumber {
		return this.bigNumberService.make(this.signedData.fee);
	}

	public override timestamp(): DateTime {
		return normalizeTimestamp(this.signedData.timestamp);
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
