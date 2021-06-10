/* istanbul ignore file */

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { KeyValuePair } from "../contracts";
import { injectable } from "../ioc";
import { UnspentTransactionData as Contract } from "./transaction.contract";

@injectable()
export class UnspentTransactionData implements Contract {
	readonly #data: KeyValuePair;

	public constructor(data: KeyValuePair) {
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
