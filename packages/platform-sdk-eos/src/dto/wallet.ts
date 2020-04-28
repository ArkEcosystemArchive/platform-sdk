import { Contracts } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class Wallet implements Contracts.Wallet {
	readonly #data: Contracts.KeyValuePair;

	public constructor(data: Contracts.KeyValuePair) {
		this.#data = data;
	}

	public getAddress(): string {
		return this.#data.account_name;
	}

	public getPublicKey(): string | undefined {
		return undefined;
	}

	public getBalance(): BigNumber {
		return BigNumber.make(this.#data.net_weight);
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): Contracts.KeyValuePair {
		return this.#data;
	}
}
