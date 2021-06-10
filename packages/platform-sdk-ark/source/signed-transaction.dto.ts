import { Identities } from "@arkecosystem/crypto";
import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { TransactionTypeService } from "./transaction-type.service";

@IoC.injectable()
export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	public sender(): string {
		return Identities.Address.fromPublicKey(this.signedData.senderPublicKey);
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
		if (this.signedData.timestamp) {
			return DateTime.make(this.signedData.timestamp);
		}

		// defaulting to now because timestamps missing in V2
		return DateTime.make();
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

	public isMultiSignature(): boolean {
		return TransactionTypeService.isMultiSignature(this.data);
	}

	public isIpfs(): boolean {
		return TransactionTypeService.isIpfs(this.data);
	}

	public isMultiPayment(): boolean {
		return TransactionTypeService.isMultiPayment(this.data);
	}

	public isDelegateResignation(): boolean {
		return TransactionTypeService.isDelegateResignation(this.data);
	}

	public isHtlcLock(): boolean {
		return TransactionTypeService.isHtlcLock(this.data);
	}

	public isHtlcClaim(): boolean {
		return TransactionTypeService.isHtlcClaim(this.data);
	}

	public isHtlcRefund(): boolean {
		return TransactionTypeService.isHtlcRefund(this.data);
	}

	public isMagistrate(): boolean {
		return TransactionTypeService.isMagistrate(this.data);
	}

	public usesMultiSignature(): boolean {
		return !!this.signedData.multiSignature;
	}
}
