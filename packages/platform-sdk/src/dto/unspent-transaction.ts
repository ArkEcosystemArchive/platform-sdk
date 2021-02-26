import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { UnspentTransactionData as Contract } from "../contracts/coins/data";

export class UnspentTransactionData implements Contract {
	readonly #data: any;

	public constructor(data: any) {
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
