import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { RawTransactionData } from "../contracts";

export abstract class AbstractSignedTransactionData {
	public constructor(protected readonly identifier: string, protected readonly signedData: RawTransactionData) {}

	public id(): string {
		return this.identifier;
	}

	public data(): RawTransactionData {
		return this.signedData;
	}

	abstract sender(): string;

	abstract recipient(): string;

	abstract amount(): BigNumber;

	abstract fee(): BigNumber;

	public get<T = string>(key: string): T {
		return this.signedData[key];
	}

	public toString(): string {
		if (typeof this.signedData === "string") {
			return this.signedData;
		}

		return JSON.stringify(this.signedData);
	}

	public toObject(): {
		id: string;
		sender: string;
		recipient: string;
		amount: string;
		fee: string;
		data: RawTransactionData;
	} {
		return {
			id: this.id(),
			sender: this.sender(),
			recipient: this.recipient(),
			amount: this.amount().toFixed(),
			fee: this.fee().toFixed(),
			data: this.data(),
		};
	}
}
