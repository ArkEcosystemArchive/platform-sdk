import { TransactionDataType } from "../contracts";
import { Paginator } from "./paginator";

export class TransactionDataCollection extends Paginator<TransactionDataType> {
	public findById(id: string): TransactionDataType | undefined {
		return this.#find("id", id);
	}

	public findByType(type: string): TransactionDataType | undefined {
		return this.#find("type", type);
	}

	public findByTimestamp(timestamp: string): TransactionDataType | undefined {
		return this.#find("timestamp", timestamp);
	}

	public findBySender(sender: string): TransactionDataType | undefined {
		return this.#find("sender", sender);
	}

	public findByRecipient(recipient: string): TransactionDataType | undefined {
		return this.#find("recipient", recipient);
	}

	#find(key: string, value: string): TransactionDataType | undefined {
		return this.items().find((transaction: TransactionDataType) => transaction[key]() === value);
	}
}
