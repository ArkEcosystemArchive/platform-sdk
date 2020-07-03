import { TransactionData } from "../../contracts";

export class TransactionDataCollection {
	#transactions: TransactionData[];

	public constructor(transactions: TransactionData[]) {
		this.#transactions = transactions;
	}

	public all(): TransactionData[] {
		return this.#transactions;
	}

	public first(): TransactionData {
		return this.#transactions[0];
	}

	public findById(id: string): TransactionData | undefined {
		return this.find("id", id);
	}

	public findByType(type: string): TransactionData | undefined {
		return this.find("type", type);
	}

	public findByTimestamp(timestamp: string): TransactionData | undefined {
		return this.find("timestamp", timestamp);
	}

	public findBySender(sender: string): TransactionData | undefined {
		return this.find("sender", sender);
	}

	public findByRecipient(recipient: string): TransactionData | undefined {
		return this.find("recipient", recipient);
	}

	private find(key: string, value: string): TransactionData | undefined {
		return this.#transactions.find((transaction: TransactionData) => transaction[key]() === value);
	}
}
