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
		return TransactionTypeService.isTransfer(this.signedData);
	}

	public isSecondSignature(): boolean {
		return TransactionTypeService.isSecondSignature(this.signedData);
	}

	public isDelegateRegistration(): boolean {
		return TransactionTypeService.isDelegateRegistration(this.signedData);
	}

	public isVoteCombination(): boolean {
		return TransactionTypeService.isVoteCombination(this.signedData);
	}

	public isVote(): boolean {
		return TransactionTypeService.isVote(this.signedData);
	}

	public isUnvote(): boolean {
		return TransactionTypeService.isUnvote(this.signedData);
	}

	public isMultiSignatureRegistration(): boolean {
		return TransactionTypeService.isMultiSignatureRegistration(this.signedData);
	}

	public isIpfs(): boolean {
		return TransactionTypeService.isIpfs(this.signedData);
	}

	public isMultiPayment(): boolean {
		return TransactionTypeService.isMultiPayment(this.signedData);
	}

	public isDelegateResignation(): boolean {
		return TransactionTypeService.isDelegateResignation(this.signedData);
	}

	public isHtlcLock(): boolean {
		return TransactionTypeService.isHtlcLock(this.signedData);
	}

	public isHtlcClaim(): boolean {
		return TransactionTypeService.isHtlcClaim(this.signedData);
	}

	public isHtlcRefund(): boolean {
		return TransactionTypeService.isHtlcRefund(this.signedData);
	}

	public isMagistrate(): boolean {
		return TransactionTypeService.isMagistrate(this.signedData);
	}

	public usesMultiSignature(): boolean {
		return !!this.signedData.multiSignature;
	}
}
