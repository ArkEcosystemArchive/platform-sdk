import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { KeyValuePair } from "../contracts/types";

export abstract class AbstractValidatorData {
	public constructor(protected readonly data: KeyValuePair) {}

	abstract id(): string;

	abstract rank(): number;

	abstract stake(): BigNumber | undefined;

	abstract delegationFee(): BigNumber | undefined;

	abstract startTime(): DateTime | undefined;

	abstract endTime(): DateTime | undefined;
}
