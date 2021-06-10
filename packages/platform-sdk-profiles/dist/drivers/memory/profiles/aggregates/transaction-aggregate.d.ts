import { Services } from "@arkecosystem/platform-sdk";
import { IProfile, ITransactionAggregate } from "../../../../contracts";
import { ExtendedTransactionDataCollection } from "../../../../dto";
declare type AggregateQuery = {
	addresses?: string[];
} & Services.ClientPagination;
export declare class TransactionAggregate implements ITransactionAggregate {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc ITransactionAggregate.all} */
	all(query?: AggregateQuery): Promise<ExtendedTransactionDataCollection>;
	/** {@inheritDoc ITransactionAggregate.sent} */
	sent(query?: AggregateQuery): Promise<ExtendedTransactionDataCollection>;
	/** {@inheritDoc ITransactionAggregate.received} */
	received(query?: AggregateQuery): Promise<ExtendedTransactionDataCollection>;
	/** {@inheritDoc ITransactionAggregate.hasMore} */
	hasMore(method: string): boolean;
	/** {@inheritDoc ITransactionAggregate.flush} */
	flush(method?: string): void;
}
export {};
