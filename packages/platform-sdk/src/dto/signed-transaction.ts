import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { RawTransactionData } from "../contracts";

export abstract class AbstractSignedTransactionData {
	protected readonly decimals?: number;

	public constructor(
		protected identifier: string,
		protected readonly signedData: RawTransactionData,
		// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
		protected readonly broadcastData: any,
		decimals?: number | string,
	) {
		this.decimals = typeof decimals === "string" ? parseInt(decimals) : decimals;
	}

	public setAttributes(attributes: { identifier: string }): void {
		this.identifier = attributes.identifier;
	}

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

	abstract timestamp(): DateTime;

	public get<T = string>(key: string): T {
		return this.signedData[key];
	}

	public toString(): string {
		if (typeof this.signedData === "string") {
			return this.signedData;
		}

		return JSON.stringify(this.signedData);
	}

	public toBroadcast(): any {
		return this.broadcastData;
	}

	public toObject(): {
		id: string;
		sender: string;
		recipient: string;
		amount: string;
		fee: string;
		timestamp: string;
		data: RawTransactionData;
		broadcast: any;
	} {
		return {
			id: this.id(),
			sender: this.sender(),
			recipient: this.recipient(),
			amount: this.amount().toFixed(),
			fee: this.fee().toFixed(),
			timestamp: this.timestamp().toISOString(),
			data: this.data(),
			broadcast: this.toBroadcast(),
		};
	}
}
