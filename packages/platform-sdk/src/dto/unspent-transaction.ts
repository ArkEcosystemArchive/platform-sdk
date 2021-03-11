import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { KeyValuePair } from "../contracts";
import { UnspentTransactionData as Contract } from "../contracts/coins/data";

/**
 *
 *
 * @export
 * @class UnspentTransactionData
 * @implements {Contract}
 */
export class UnspentTransactionData implements Contract {
	/**
	 *
	 *
	 * @type {KeyValuePair}
	 * @memberof UnspentTransactionData
	 */
	readonly #data: KeyValuePair;

	/**
	 *Creates an instance of UnspentTransactionData.
	 * @param {KeyValuePair} data
	 * @memberof UnspentTransactionData
	 */
	public constructor(data: KeyValuePair) {
		this.#data = data;
	}

	/**
	 *
	 *
	 * @returns {string}
	 * @memberof UnspentTransactionData
	 */
	public id(): string {
		return this.#data.id;
	}

	/**
	 *
	 *
	 * @returns {DateTime}
	 * @memberof UnspentTransactionData
	 */
	public timestamp(): DateTime {
		return this.#data.timestamp;
	}

	/**
	 *
	 *
	 * @returns {BigNumber}
	 * @memberof UnspentTransactionData
	 */
	public amount(): BigNumber {
		return this.#data.amount;
	}

	/**
	 *
	 *
	 * @returns {string[]}
	 * @memberof UnspentTransactionData
	 */
	public addresses(): string[] {
		return this.#data.addresses;
	}
}
