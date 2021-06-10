import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
export declare type RawTransactionData = any;
export interface SignedTransactionData {
	setAttributes(attributes: { identifier: string }): void;
	configure(identifier: string, signedData: RawTransactionData, broadcastData: any, decimals?: number | string): any;
	id(): string;
	data(): RawTransactionData;
	sender(): string;
	recipient(): string;
	amount(): BigNumber;
	fee(): BigNumber;
	timestamp(): DateTime;
	isMultiSignature(): boolean;
	isMultiSignatureRegistration(): boolean;
	get<T = string>(key: string): T;
	toString(): string;
	toBroadcast(): any;
	toObject(): {
		id: string;
		sender: string;
		recipient: string;
		amount: string;
		data: any;
	};
}
