import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
export declare class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	sender(): string;
	recipient(): string;
	amount(): BigNumber;
	fee(): BigNumber;
	timestamp(): DateTime;
	isMultiSignature(): boolean;
	isMultiSignatureRegistration(): boolean;
}
