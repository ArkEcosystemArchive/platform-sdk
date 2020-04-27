import { BigNumber } from "@arkecosystem/utils";

import { KeyValuePair } from "../../../types";
import { Wallet as Contract } from "../../contracts/client";

export class Wallet implements Contract {
	readonly #data: KeyValuePair;

	public constructor(data: KeyValuePair) {
		this.#data = data;
	}

	public getAddress(): string {
		return this.#data.address;
	}

	public getPublicKey(): string | undefined {
		return undefined;
	}

	public getBalance(): BigNumber {
		return BigNumber.make(this.#data.balance);
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): KeyValuePair {
		return this.#data;
	}
}
