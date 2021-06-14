import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { normalizeTimestamp } from "./timestamps";
import { TransactionTypeService } from "./transaction-type.service";

@IoC.injectable()
export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	public sender(): string {
		return this.signedData.senderId;
	}

	public recipient(): string {
		return this.signedData.recipientId;
	}

	public amount(): BigNumber {
		return this.bigNumberService.make(this.signedData.amount);
	}

	public fee(): BigNumber {
		return this.bigNumberService.make(this.signedData.fee);
	}

	public timestamp(): DateTime {
		return normalizeTimestamp(this.signedData.timestamp);
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
