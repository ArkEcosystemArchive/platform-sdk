import { Contracts } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class WalletData implements Contracts.WalletData {
	readonly #data: Contracts.KeyValuePair;

	public constructor(data: Contracts.KeyValuePair) {
		this.#data = data;
	}

	public getAddress(): string {
		return this.#data.address;
	}

	public getPublicKey(): string | undefined {
		return this.#data.publicKey;
	}

	public getBalance(): BigNumber {
		return BigNumber.make(this.#data.balance);
	}

	public getNonce(): BigNumber {
		return BigNumber.make(this.#data.nonce);
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): Contracts.KeyValuePair {
		return this.#data;
	}
}
