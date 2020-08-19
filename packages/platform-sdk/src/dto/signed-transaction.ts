import { BigNumber } from "@arkecosystem/platform-sdk-support";

export abstract class AbstractSignedTransactionData {
	public constructor(protected readonly identifier: string, protected readonly signedData: any) {}

	public id(): string {
		return this.identifier;
	}

	public data(): any {
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
		data: any;
	} {
		return {
			id: this.id(),
			sender: this.sender(),
			recipient: this.recipient(),
			amount: this.amount().toFixed(),
			fee: this.fee().toFixed(),
			data: this.signedData,
		};
	}
}
