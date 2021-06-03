import { Coins } from "@arkecosystem/platform-sdk";

import { ExtendedTransactionData } from "./transaction";

export class ExtendedTransactionDataCollection extends Coins.Paginator<ExtendedTransactionData> {
	public findById(id: string): ExtendedTransactionData | undefined {
		return this.#find("id", id);
	}

	public findByType(type: string): ExtendedTransactionData | undefined {
		return this.#find("type", type);
	}

	public findByTimestamp(timestamp: string): ExtendedTransactionData | undefined {
		return this.#find("timestamp", timestamp);
	}

	public findBySender(sender: string): ExtendedTransactionData | undefined {
		return this.#find("sender", sender);
	}

	public findByRecipient(recipient: string): ExtendedTransactionData | undefined {
		return this.#find("recipient", recipient);
	}

	#find(key: string, value: string): ExtendedTransactionData | undefined {
		return this.items().find((transaction: ExtendedTransactionData) => transaction[key]() === value);
	}
}
