import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { UnspentTransactionData as Contract } from "../contracts/coins/data";

interface RawData {
	id: string;
	timestamp: DateTime;
	amount: BigNumber;
	addresses: string[];
};

export class UnspentTransactionData implements Contract {
	readonly #data: RawData;

	public constructor(data: RawData) {
		this.#data = data;
	}

	public id(): string {
		return this.#data.id;
	}

	public timestamp(): DateTime {
		return this.#data.timestamp;
	}

	public amount(): BigNumber {
		return this.#data.amount;
	}

	public addresses(): string[] {
		return this.#data.addresses;
	}
}
