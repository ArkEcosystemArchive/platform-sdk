import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	/** {@inheritDoc Contracts.SignedTransactionData.sender} */
	public sender(): string {
		return this.signedData.sender;
	}

	/** {@inheritDoc Contracts.SignedTransactionData.recipient} */
	public recipient(): string {
		return this.signedData.recipient;
	}

	/** {@inheritDoc Contracts.SignedTransactionData.amount} */
	public amount(): BigNumber {
		return BigNumber.make(this.signedData.amount, this.decimals);
	}

	/** {@inheritDoc Contracts.SignedTransactionData.fee} */
	public fee(): BigNumber {
		return BigNumber.make(this.signedData.fee, this.decimals);
	}

	/** {@inheritDoc Contracts.SignedTransactionData.fee} */
	public timestamp(): DateTime {
		return DateTime.make(this.signedData.timestamp);
	}

	/** {@inheritDoc Contracts.SignedTransactionData.isMultiSignature} */
	public isMultiSignature(): boolean {
		return this.signedData.isMultiSignature;
	}

	/** {@inheritDoc Contracts.SignedTransactionData.isMultiSignatureRegistration} */
	public isMultiSignatureRegistration(): boolean {
		return this.signedData.isMultiSignatureRegistration;
	}
}
