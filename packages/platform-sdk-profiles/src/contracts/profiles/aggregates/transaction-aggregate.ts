import { Contracts } from "@arkecosystem/platform-sdk";
import { ExtendedTransactionDataCollection } from "../../../dto/transaction-collection";

type AggregateQuery = {
	addresses?: string[];
} & Contracts.ClientPagination;

export interface ITransactionAggregate {
	transactions(query: AggregateQuery): Promise<ExtendedTransactionDataCollection>;
	sentTransactions(query: AggregateQuery): Promise<ExtendedTransactionDataCollection>;
	receivedTransactions(query: AggregateQuery): Promise<ExtendedTransactionDataCollection>;
	hasMore(method: string): boolean;
	flush(method: string): void;
}
