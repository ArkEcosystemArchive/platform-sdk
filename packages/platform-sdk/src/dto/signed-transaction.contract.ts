import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export type RawTransactionData = any;

export interface SignedTransactionData {
	setAttributes(attributes: { identifier: string }): void;

	configure(identifier: string, signedData: RawTransactionData, broadcastData: any, decimals?: number | string);

	// All
	id(): string;
	data(): RawTransactionData;
	sender(): string;
	recipient(): string;
	amount(): BigNumber;
	fee(): BigNumber;
	timestamp(): DateTime;

	// MultiSignature
	isMultiSignature(): boolean;
	isMultiSignatureRegistration(): boolean;

	// Helpers
	get<T = string>(key: string): T;
	toString(): string;
	toBroadcast(): any;
	toObject(): { id: string; sender: string; recipient: string; amount: string; data: any };
}
