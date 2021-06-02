import { Services } from "@arkecosystem/platform-sdk";

import { ExtendedTransactionData } from "../../../dto/transaction";
import { ExtendedTransactionDataCollection } from "../../../dto/transaction-collection";

export interface ITransactionIndex {
	/**
	 * Get a list of sent and received transactions.
	 *
	 * @param {Services.ClientTransactionsInput} [query]
	 * @return {Promise<ExtendedTransactionDataCollection>}
	 * @memberof IReadWriteWallet
	 */
	all(query?: Services.ClientTransactionsInput): Promise<ExtendedTransactionDataCollection>;

	/**
	 * Get a list of sent transactions.
	 *
	 * @param {Services.ClientTransactionsInput} [query]
	 * @return {Promise<ExtendedTransactionDataCollection>}
	 * @memberof IReadWriteWallet
	 */
	sent(query?: Services.ClientTransactionsInput): Promise<ExtendedTransactionDataCollection>;

	/**
	 * Get a list of received transactions.
	 *
	 * @param {Services.ClientTransactionsInput} [query]
	 * @return {Promise<ExtendedTransactionDataCollection>}
	 * @memberof IReadWriteWallet
	 */
	received(query?: Services.ClientTransactionsInput): Promise<ExtendedTransactionDataCollection>;

	/**
	 * Find a transaction by the given ID.
	 *
	 * @param {string} id
	 * @return {Promise<ExtendedTransactionData>}
	 * @memberof IReadWriteWallet
	 */
	findById(id: string): Promise<ExtendedTransactionData>;

	/**
	 * Find many transactions by the given IDs.
	 *
	 * @param {string[]} ids
	 * @return {Promise<ExtendedTransactionData[]>}
	 * @memberof IReadWriteWallet
	 */
	findByIds(ids: string[]): Promise<ExtendedTransactionData[]>;
}
