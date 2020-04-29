import { Contracts } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class BlockData implements Contracts.BlockData {
	readonly #data: Contracts.KeyValuePair;

	public constructor(data: Contracts.KeyValuePair) {
		this.#data = data;
	}

	public getId(): string {
		return this.#data.id;
	}

	public getHeight(): string {
		return this.#data.height;
	}

	public getTimestamp(): string {
		return this.#data.timestamp;
	}

	public getConfirmations(): BigNumber {
		return BigNumber.make(this.#data.confirmations);
	}

	public getTransactionsCount(): number {
		return this.#data.numberOfTransactions;
	}

	public getGenerator(): string {
		return this.#data.generatorPublicKey;
	}

	public getForgedReward(): BigNumber {
		return BigNumber.make(this.#data.reward);
	}

	public getForgedAmount(): BigNumber {
		return BigNumber.make(this.#data.totalAmount);
	}

	public getForgedFee(): BigNumber {
		return BigNumber.make(this.#data.totalFee);
	}

	public getForgedTotal(): BigNumber {
		return BigNumber.make(this.#data.totalForged);
	}

	/**
	 * Only use this function if you can ensure that the unnormalised data is handled!
	 */
	public toObject(): Contracts.KeyValuePair {
		return this.#data;
	}
}
