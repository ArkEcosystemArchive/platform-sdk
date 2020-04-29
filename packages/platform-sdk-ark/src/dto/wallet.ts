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

	public toObject(): Contracts.KeyValuePair {
		return {
			address: this.getAddress(),
			publicKey: this.getPublicKey(),
			balance: this.getBalance(),
			nonce: this.getNonce(),
		};
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public raw(): Contracts.KeyValuePair {
		return this.#data;
	}
}
