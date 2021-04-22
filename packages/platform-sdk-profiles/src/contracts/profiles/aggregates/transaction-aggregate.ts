import { Contracts } from "@arkecosystem/platform-sdk";
import { ExtendedTransactionDataCollection } from "../../../dto/transaction-collection";

type AggregateQuery = {
	addresses?: string[];
} & Contracts.ClientPagination;

/**
 * Defines the implementation contract for the transaction aggregate.
 *
 * @export
 * @interface ITransactionAggregate
 */
export interface ITransactionAggregate {
	/**
	 * Aggregate sent and received transactions using the given query.
	 *
	 * @param {AggregateQuery} query
	 * @return {*}  {Promise<ExtendedTransactionDataCollection>}
	 * @memberof ITransactionAggregate
	 */
	all(query: AggregateQuery): Promise<ExtendedTransactionDataCollection>;

	/**
	 * Aggregate sent transactions using the given query.
	 *
	 * @param {AggregateQuery} query
	 * @return {*}  {Promise<ExtendedTransactionDataCollection>}
	 * @memberof ITransactionAggregate
	 */
	sent(query: AggregateQuery): Promise<ExtendedTransactionDataCollection>;

	/**
	 * Aggregate received transactions using the given query.
	 *
	 * @param {AggregateQuery} query
	 * @return {*}  {Promise<ExtendedTransactionDataCollection>}
	 * @memberof ITransactionAggregate
	 */
	received(query: AggregateQuery): Promise<ExtendedTransactionDataCollection>;

	/**
	 * Determines if there are more transactions for the given method.
	 *
	 * @param {string} method
	 * @return {*}  {boolean}
	 * @memberof ITransactionAggregate
	 */
	hasMore(method: string): boolean;

	/**
	 * Remove all transactions that have been aggregated.
	 *
	 * @param {string} method
	 * @memberof ITransactionAggregate
	 */
	flush(method: string): void;
}
