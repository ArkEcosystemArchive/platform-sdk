import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { RawTransactionData, SignedTransactionData } from "../contracts";
import { BigNumberService } from "../services";
export declare class AbstractSignedTransactionData implements SignedTransactionData {
	protected readonly bigNumberService: BigNumberService;
	protected identifier: string;
	protected signedData: RawTransactionData;
	protected broadcastData: any;
	protected decimals: number | undefined;
	configure(identifier: string, signedData: RawTransactionData, broadcastData: any, decimals?: number | string): this;
	setAttributes(attributes: { identifier: string }): void;
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
		fee: string;
		timestamp: string;
		data: RawTransactionData;
		broadcast: any;
	};
}
