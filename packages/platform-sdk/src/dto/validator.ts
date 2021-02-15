import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { KeyValuePair } from "../contracts/types";

export abstract class AbstractValidatorData {
	public constructor(protected readonly data: KeyValuePair) {}

	abstract id(): string;

	abstract alias(): string;

	abstract rank(): number;

	abstract stake(): BigNumber | undefined;

	abstract delegationFee(): BigNumber | undefined;

	public toObject(): KeyValuePair {
		return {
			id: this.id(),
			rank: this.rank(),
			stake: this.stake(),
			delegationFee: this.delegationFee(),
		};
	}
}
