import { BigNumber } from "@arkecosystem/utils";

import { KeyValuePair } from "../contracts/types";

export abstract class AbstractBlockData {
	public constructor(protected readonly data: KeyValuePair) {}

	abstract getId(): string;

	abstract getHeight(): string;

	abstract getTimestamp(): string;

	abstract getConfirmations(): BigNumber;

	abstract getTransactionsCount(): number;

	abstract getGenerator(): string;

	abstract getForgedReward(): BigNumber;

	abstract getForgedAmount(): BigNumber;

	abstract getForgedFee(): BigNumber;

	abstract getForgedTotal(): BigNumber;

	public toObject(): KeyValuePair {
		return {
			id: this.getId(),
			height: this.getHeight(),
			timestamp: this.getTimestamp(),
			confirmations: this.getConfirmations(),
			transactionsCount: this.getTransactionsCount(),
			generator: this.getGenerator(),
			forgedReward: this.getForgedReward(),
			forgedAmount: this.getForgedAmount(),
			forgedFee: this.getForgedFee(),
			forgedTotal: this.getForgedTotal(),
		};
	}

	public raw(): KeyValuePair {
		return this.data;
	}
}
