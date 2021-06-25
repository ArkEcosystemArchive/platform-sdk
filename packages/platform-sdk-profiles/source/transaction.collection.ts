import { Collections } from "@arkecosystem/platform-sdk";

import { ExtendedConfirmedTransactionData } from "./transaction.dto";

export class ExtendedConfirmedTransactionDataCollection extends Collections.Paginator<ExtendedConfirmedTransactionData> {
	public findById(id: string): ExtendedConfirmedTransactionData | undefined {
		return this.#find("id", id);
	}

	public findByType(type: string): ExtendedConfirmedTransactionData | undefined {
		return this.#find("type", type);
	}

	public findByTimestamp(timestamp: string): ExtendedConfirmedTransactionData | undefined {
		return this.#find("timestamp", timestamp);
	}

	public findBySender(sender: string): ExtendedConfirmedTransactionData | undefined {
		return this.#find("sender", sender);
	}

	public findByRecipient(recipient: string): ExtendedConfirmedTransactionData | undefined {
		return this.#find("recipient", recipient);
	}

	#find(key: string, value: string): ExtendedConfirmedTransactionData | undefined {
		return this.items().find((transaction: ExtendedConfirmedTransactionData) => transaction[key]() === value);
	}
}
