import { TransactionDataType } from "../../contracts/coins/data";
import { Paginator } from "./paginator";

/**
 *
 *
 * @export
 * @class TransactionDataCollection
 * @extends {Paginator<TransactionDataType>}
 */
export class TransactionDataCollection extends Paginator<TransactionDataType> {
	/**
	 *
	 *
	 * @param {string} id
	 * @returns {(TransactionDataType | undefined)}
	 * @memberof TransactionDataCollection
	 */
	public findById(id: string): TransactionDataType | undefined {
		return this.find("id", id);
	}

	/**
	 *
	 *
	 * @param {string} type
	 * @returns {(TransactionDataType | undefined)}
	 * @memberof TransactionDataCollection
	 */
	public findByType(type: string): TransactionDataType | undefined {
		return this.find("type", type);
	}

	/**
	 *
	 *
	 * @param {string} timestamp
	 * @returns {(TransactionDataType | undefined)}
	 * @memberof TransactionDataCollection
	 */
	public findByTimestamp(timestamp: string): TransactionDataType | undefined {
		return this.find("timestamp", timestamp);
	}

	/**
	 *
	 *
	 * @param {string} sender
	 * @returns {(TransactionDataType | undefined)}
	 * @memberof TransactionDataCollection
	 */
	public findBySender(sender: string): TransactionDataType | undefined {
		return this.find("sender", sender);
	}

	/**
	 *
	 *
	 * @param {string} recipient
	 * @returns {(TransactionDataType | undefined)}
	 * @memberof TransactionDataCollection
	 */
	public findByRecipient(recipient: string): TransactionDataType | undefined {
		return this.find("recipient", recipient);
	}

	/**
	 *
	 *
	 * @private
	 * @param {string} key
	 * @param {string} value
	 * @returns {(TransactionDataType | undefined)}
	 * @memberof TransactionDataCollection
	 */
	private find(key: string, value: string): TransactionDataType | undefined {
		return this.items().find((transaction: TransactionDataType) => transaction[key]() === value);
	}
}
