import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
export declare class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	/** {@inheritDoc Contracts.SignedTransactionData.sender} */
	sender(): string;
	/** {@inheritDoc Contracts.SignedTransactionData.recipient} */
	recipient(): string;
	/** {@inheritDoc Contracts.SignedTransactionData.amount} */
	amount(): BigNumber;
	/** {@inheritDoc Contracts.SignedTransactionData.fee} */
	fee(): BigNumber;
	/** {@inheritDoc Contracts.SignedTransactionData.fee} */
	timestamp(): DateTime;
	/** {@inheritDoc Contracts.SignedTransactionData.isMultiSignature} */
	isMultiSignature(): boolean;
	/** {@inheritDoc Contracts.SignedTransactionData.isMultiSignatureRegistration} */
	isMultiSignatureRegistration(): boolean;
}
