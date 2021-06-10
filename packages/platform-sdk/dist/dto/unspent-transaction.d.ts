import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { KeyValuePair } from "../contracts";
import { UnspentTransactionData as Contract } from "./transaction.contract";
export declare class UnspentTransactionData implements Contract {
	#private;
	constructor(data: KeyValuePair);
	id(): string;
	timestamp(): DateTime;
	amount(): BigNumber;
	addresses(): string[];
}
