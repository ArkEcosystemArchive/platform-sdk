import { ConfirmedTransactionData } from "../dto/confirmed-transaction.contract";
import { Paginator } from "./paginator";

export class ConfirmedTransactionDataCollection extends Paginator<ConfirmedTransactionData> {
	public findById(id: string): ConfirmedTransactionData | undefined {
		return this.#find("id", id);
	}

	public findByType(type: string): ConfirmedTransactionData | undefined {
		return this.#find("type", type);
	}

	public findByTimestamp(timestamp: string): ConfirmedTransactionData | undefined {
		return this.#find("timestamp", timestamp);
	}

	public findBySender(sender: string): ConfirmedTransactionData | undefined {
		return this.#find("sender", sender);
	}

	public findByRecipient(recipient: string): ConfirmedTransactionData | undefined {
		return this.#find("recipient", recipient);
	}

	#find(key: string, value: string): ConfirmedTransactionData | undefined {
		return this.items().find((transaction: ConfirmedTransactionData) => transaction[key]() === value);
	}
}
