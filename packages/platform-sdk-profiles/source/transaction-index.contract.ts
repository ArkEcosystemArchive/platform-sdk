import { Services } from "@arkecosystem/platform-sdk";

import { ExtendedConfirmedTransactionData } from "./transaction.dto";
import { ExtendedConfirmedTransactionDataCollection } from "./transaction.collection";

export interface ITransactionIndex {
	/**
	 * Get a list of sent and received transactions.
	 *
	 * @param {Services.ClientTransactionsInput} [query]
	 * @return {Promise<ExtendedConfirmedTransactionDataCollection>}
	 * @memberof IReadWriteWallet
	 */
	all(query?: Services.ClientTransactionsInput): Promise<ExtendedConfirmedTransactionDataCollection>;

	/**
	 * Get a list of sent transactions.
	 *
	 * @param {Services.ClientTransactionsInput} [query]
	 * @return {Promise<ExtendedConfirmedTransactionDataCollection>}
	 * @memberof IReadWriteWallet
	 */
	sent(query?: Services.ClientTransactionsInput): Promise<ExtendedConfirmedTransactionDataCollection>;

	/**
	 * Get a list of received transactions.
	 *
	 * @param {Services.ClientTransactionsInput} [query]
	 * @return {Promise<ExtendedConfirmedTransactionDataCollection>}
	 * @memberof IReadWriteWallet
	 */
	received(query?: Services.ClientTransactionsInput): Promise<ExtendedConfirmedTransactionDataCollection>;

	/**
	 * Find a transaction by the given ID.
	 *
	 * @param {string} id
	 * @return {Promise<ExtendedConfirmedTransactionData>}
	 * @memberof IReadWriteWallet
	 */
	findById(id: string): Promise<ExtendedConfirmedTransactionData>;

	/**
	 * Find many transactions by the given IDs.
	 *
	 * @param {string[]} ids
	 * @return {Promise<ExtendedConfirmedTransactionData[]>}
	 * @memberof IReadWriteWallet
	 */
	findByIds(ids: string[]): Promise<ExtendedConfirmedTransactionData[]>;
}
